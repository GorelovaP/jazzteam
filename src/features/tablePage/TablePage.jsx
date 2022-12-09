import {ThemeWrapper} from "../../common/components/themeWrapper/ThemeWrapper";
import {useEffect} from "react";
import "./table.css"
import {
    changeEditModeAC, changeIsSelectedAC,
    changeValueAC,
    getTableDataFromDbTC,
} from "../../redux/table-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../common/components/loading/Loading";


export const TablePage = () => {
    const dispatch = useDispatch()
    const tableInfo = useSelector(state => state.table.tableInfo)
    const isLoading = useSelector(state => state.app.isLoading)

    useEffect(() => {
        dispatch(getTableDataFromDbTC())
    }, []);


    const changeEditMode = (id, prop, mode) => {
        dispatch(changeEditModeAC(id, prop, mode))
    }

    const closeOnEnterEditMode = (event, id, prop, mode) => {
        if (event.keyCode === 13) {
            changeEditMode(id, prop, mode)
        }
    }

    const changeValue = (id, prop, event) => {
        dispatch(changeValueAC(id, prop, event))
    }

    const selectRow = (id) => {
        dispatch(changeIsSelectedAC(id))
    }

    const getHeaderRow = () => {
        if (tableInfo.length) {
            const headerCells = tableInfo[0].rows.map(field => {
                return tableInfo[0].rows[0] === field
                    ? <th key={field.prop}
                          className="row__cell row__cell_sticky header__cell_sticky maxVisiblePriority ">{field.value}</th>
                    : <th key={field.prop} className="row__cell header__cell_sticky">{field.value}</th>
            })
            return <tr>{headerCells}</tr>
        }

    }

    const headerRow = getHeaderRow()

    const rows = tableInfo.length && tableInfo.map(obj => {
        if (tableInfo[0].id === obj.id) {
            return null
        }

        const cells = obj.rows.map(field => {
            let elem;
            if (!field.isEdit) {
                elem = <span
                    onClick={() => changeEditMode({id: obj.id, prop: field.prop, mode: true})}>  {field.value} </span>
            } else {
                elem = <input
                    className="row__cell__input"
                    autoFocus
                    value={field.value}
                    onChange={(event) => changeValue({id: obj.id, prop: field.prop, event: event.target.value})}
                    onBlur={() => changeEditMode({id: obj.id, prop: field.prop, mode: false})}
                    onKeyDown={(event) => closeOnEnterEditMode(event, {id: obj.id, prop: field.prop, mode: false})}
                />;
            }

            //1 столбец статический
            if (obj.rows[0] === field) {
                elem = <span>{field.value} </span>;
                return <td onClick={() => selectRow({id: obj.id})}
                           className={`row__cell row__cell_sticky ${obj.isSelected === true ? "row__cell_selected" : ""}`}
                           key={field.prop}>{elem}</td>
            }

            return <td className="row__cell" key={field.prop}>{elem}</td>;
        });

        return <tr className={`row ${obj.isSelected === true ? "row_selected" : ""}`}
                   key={obj.id}>{cells}</tr>
    });


    return <ThemeWrapper>
        <div className="tablePageWrapper">
            <h2 className="tablePageWrapper__header">Table of synonyms and antonyms</h2>
            <div className="tableArea">
                {isLoading
                    ? <Loading/>
                    : <>
                        <div className="wrapperTAbl">

                            <table>
                                <thead className="tableArea__header">
                                {headerRow}
                                </thead>
                                <tbody>
                                {rows}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            Information
                        </div>
                    </>
                }
            </div>
        </div>
    </ThemeWrapper>;
}

