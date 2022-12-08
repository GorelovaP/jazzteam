import {ThemeWrapper} from "../../common/components/themeWrapper/ThemeWrapper";
import {useState} from "react";
import "./table.css"
import testData from './data.json';


export const TablePage = () => {
    const [objArr, setObjArr] = useState(testData);

    const getHeaderRow = () => {
        const headerCells = objArr[0].rows.map(field => {
            return objArr[0].rows[0] === field
                ? <th key={field.prop} className="cell cell_sticky header__cell_sticky ">{field.value}</th>
                : <th key={field.prop} className="cell header__cell_sticky">{field.value}</th>
        })
        return <tr>{headerCells}</tr>
    }

    const headerRow = getHeaderRow()
    const rows = objArr.map(obj => {
        if (objArr[0].id === obj.id) {
            return
        }

        const cells = obj.rows.map(field => {
            let elem;
            if (!field.isEdit) {
                elem = <span onClick={() => openEditMode(obj.id, field.prop)}>  {field.value} </span>;
            } else {
                elem = <input
                    className="cell__input"
                    value={field.value}
                    onChange={(event) => change(obj.id, field.prop, event)}
                    onBlur={() => closeEditMode(obj.id, field.prop)}/>;
            }

            //1 столбец статический
            if (obj.rows[0] === field) {
                elem = <span>{field.value} </span>;
                return <td className="cell cell_sticky" key={field.prop}>{elem}</td>;
            }

            return <td className="cell" key={field.prop}>{elem}</td>;
        });

        return <tr key={obj.id}>{cells}</tr>;
    });


    function openEditMode(id, prop) {
        setObjArr(objArr.map(obj => {
            if (obj.id === id) {
                const rows = obj.rows.map(field => {
                    if (field.prop === prop) {
                        return {...field, isEdit: true}
                    } else {
                        return field;
                    }
                });
                return {id, rows};
            } else {
                return obj;
            }
        }));
    }

    function closeEditMode(id, prop) {
        setObjArr(objArr.map(obj => {
            if (obj.id === id) {
                const rows = obj.rows.map(field => {
                    if (field.prop === prop) {
                        return {...field, isEdit: false}
                    } else {
                        return field;
                    }
                });
                return {id, rows};
            } else {
                return obj;
            }
        }));
    }

    function change(id, prop, event) {
        setObjArr(objArr.map(obj => {
            if (obj.id === id) {
                const rows = obj.rows.map(field => {
                    if (field.prop === prop) {
                        return {...field, value: event.target.value}
                    } else {
                        return field;
                    }
                });
                return {id, rows};
            } else {
                return obj;
            }
        }));
    }

    return <ThemeWrapper>
        <div className="tablePageWrapper">
            <h2 className="tablePageWrapper__header">Table of synonyms and antonyms</h2>
            <div className="tableArea">
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
            </div>
        </div>
    </ThemeWrapper>;
}

