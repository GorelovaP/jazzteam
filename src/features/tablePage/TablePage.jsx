import {ThemeWrapper} from "../../common/components/themeWrapper/ThemeWrapper";
import {useEffect} from "react";
import {
    changeIsSelectedAC,
    getTableDataFromDbTC,
} from "../../redux/table-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../common/components/loading/Loading";
import {EditableSpan} from "../../common/components/editableSpan/EditableSpan";
import "./table.css"


export const TablePage = () => {
    const dispatch = useDispatch()
    const tableInfo = useSelector(state => state.table.tableInfo)
    const isLoading = useSelector(state => state.app.isLoading)
    const selectedRows = useSelector(state => state.table.selectedRows)
    const totalAmount = useSelector(state => state.table.totalAmount)

    useEffect(() => {
        if (tableInfo.length === 0) {
            dispatch(getTableDataFromDbTC())
        }
    }, []);


    const selectRow = (id) => {
        dispatch(changeIsSelectedAC(id))
    }

    const rows = tableInfo.map(obj => {
        const cells = obj.rows.map(field => {
            if (obj.rows[0] === field) {
                return <td key={field.prop}
                           onClick={() => selectRow({id: obj.id})}
                           className={`row__cell row__cell_sticky ${obj.isSelected === true ? "row__cell_selected" : ""}`}>{field.value}</td>
            }
            return <td className="row__cell" key={field.prop}><EditableSpan id={obj.id} prop={field.prop}
                                                                            fieldValue={field.value}/></td>;
        });
        return <tr key={obj.id} className={`row ${obj.isSelected === true ? "row_selected" : ""}`}>{cells}</tr>
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
                                <tbody>{rows}</tbody>
                            </table>
                        </div>
                        <div className="tableArea__informationWrapper">
                           <span className="tableArea__informationWrapper__span">
                               Total amount of data : <span
                               className="tableArea__informationWrapper__span__count_blue">{totalAmount}</span>
                           </span>
                            <span className="tableArea__informationWrapper__span">
                                  SelectedRows : <span className="tableArea__informationWrapper__span__count_green">
                                {selectedRows}
                            </span>
                            </span>
                        </div>
                    </>
                }
            </div>
        </div>
    </ThemeWrapper>;
}

