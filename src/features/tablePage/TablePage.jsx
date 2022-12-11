import "./table.css";

import {
  changeIsSelectedAC,
  getTableDataFromDbTC,
} from "../../redux/table/table-reducer";
import {
  getSelectedRowsSelector,
  getTableInfoSelector,
  getTotalAmountSelector,
} from "../../redux/table/table-selectors";

import { useDispatch, useSelector } from "react-redux";
import { EditableSpan } from "../../common/components/editableSpan/EditableSpan";
import { Loading } from "../../common/components/loading/Loading";
import React from "react";
import { ThemeWrapper } from "../../common/components/themeWrapper/ThemeWrapper";
import { getIsLoadingSelector } from "../../redux/app/app-selectors";
import { useEffect } from "react";

export const TablePage = () => {
  const dispatch = useDispatch();
  const tableInfo = useSelector(getTableInfoSelector);
  const isLoading = useSelector(getIsLoadingSelector);
  const selectedRows = useSelector(getSelectedRowsSelector);
  const totalAmount = useSelector(getTotalAmountSelector);

  useEffect(() => {
    if (tableInfo.length === 0) {
      dispatch(getTableDataFromDbTC());
    }
  }, []);

  const selectRow = (id) => {
    dispatch(changeIsSelectedAC(id));
  };

  const rows = tableInfo.map((obj) => {
    const cells = obj.rows.map((field) => {
      if (obj.rows[0] === field) {
        return (
          <td
            key={field.prop}
            onClick={() => selectRow({ id: obj.id })}
            className={`row__cell row__cell_sticky ${
              obj.isSelected === true ? "row__cell_selected" : ""
            }`}
          >
            {field.value}
          </td>
        );
      }
      return (
        <td className="row__cell" key={field.prop}>
          <EditableSpan
            id={obj.id}
            prop={field.prop}
            fieldValue={field.value}
          />
        </td>
      );
    });
    return (
      <tr
        key={obj.id}
        className={`row ${obj.isSelected === true ? "row_selected" : ""}`}
      >
        {cells}
      </tr>
    );
  });

  return (
    <ThemeWrapper>
      <div className="tablePageWrapper">
        <h2 className="tablePageWrapper__header">
          Table of synonyms and antonyms
        </h2>
        <div className="tableArea">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="wrapperTAbl">
                <table>
                  <thead className="tableArea__header">
                    <tr>
                      <th className="row__cell row__cell_sticky header__cell_sticky maxVisiblePriority ">
                        Word
                      </th>
                      <th className="row__cell header__cell_sticky">
                        Transcription
                      </th>
                      <th className="row__cell header__cell_sticky">
                        Translation
                      </th>
                      <th className="row__cell header__cell_sticky">
                        Part of speech
                      </th>
                      <th className="row__cell header__cell_sticky">Antonym</th>
                      <th className="row__cell header__cell_sticky">
                        Antonym Transcription
                      </th>
                      <th className="row__cell header__cell_sticky">
                        Antonym Translation
                      </th>
                      <th className="row__cell header__cell_sticky">Example</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
              </div>
              <div className="tableArea__informationWrapper">
                <span className="tableArea__informationWrapper__span">
                  Total amount of data :{" "}
                  <span className="tableArea__informationWrapper__span__count_blue">
                    {totalAmount}
                  </span>
                </span>
                <span className="tableArea__informationWrapper__span">
                  SelectedRows :{" "}
                  <span className="tableArea__informationWrapper__span__count_green">
                    {selectedRows}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </ThemeWrapper>
  );
};
