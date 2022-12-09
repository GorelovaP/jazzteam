import {ThemeWrapper} from "../../common/components/themeWrapper/ThemeWrapper";
import {useEffect} from "react";
import "./table.css"
import {
    changeIsSelectedAC,
    getTableDataFromDbTC,
} from "../../redux/table-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../common/components/loading/Loading";
import {EditableSpan} from "../../common/components/editableSpan/EditableSpan";


export const TablePage = () => {
    const dispatch = useDispatch()
    const tableInfo = useSelector(state => state.table.tableInfo)
    const isLoading = useSelector(state => state.app.isLoading)
    const selectedRows = useSelector(state => state.table.selectedRows)

    useEffect(() => {
        dispatch(getTableDataFromDbTC())
    }, []);

    const selectRow = (id) => {
        dispatch(changeIsSelectedAC(id))
    }

    const rows = tableInfo.length && tableInfo.map(obj => {
        const cells = obj.rows.map(field => {
            //1 столбец статический
            if (obj.rows[0] === field) {
                return <td onClick={() => selectRow({id: obj.id})}
                           className={`row__cell row__cell_sticky ${obj.isSelected === true ? "row__cell_selected" : ""}`}
                           key={field.prop}>
                    <span>{field.value} </span>
                </td>
            }
            return <td className="row__cell" key={field.prop}>
                <EditableSpan id={obj.id} prop={field.prop} fieldValue={field.value}/>
            </td>;
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
                                <tr>
                                    <th className="row__cell row__cell_sticky header__cell_sticky maxVisiblePriority ">Word</th>
                                    <th className="row__cell header__cell_sticky">Transcription</th>
                                    <th className="row__cell header__cell_sticky">Translation</th>
                                    <th className="row__cell header__cell_sticky">Part of speech</th>
                                    <th className="row__cell header__cell_sticky">Antonym</th>
                                    <th className="row__cell header__cell_sticky">Antonym Transcription</th>
                                    <th className="row__cell header__cell_sticky">Antonym Translation</th>
                                    <th className="row__cell header__cell_sticky">Example</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rows}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            total amount of data :
                            selectedRows : {selectedRows}
                        </div>
                    </>
                }
            </div>
        </div>
    </ThemeWrapper>;
}

