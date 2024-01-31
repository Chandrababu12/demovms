import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Grouping,
  ColumnFixing
} from "devextreme-react/data-grid";
import { FormattedMessage } from "react-intl";


export default function SettingsPermissionNew() {

  return (
    <div className="clearfix">
      <div className="account-security">
        <div className="setting-page-business-info mt-5">
          <div className="table-responsive">

            <div className="table">
              <PermissionDev />
              <div>
                <div className="w-100 mt-10 patientButton">
                  <button
                    className="btn btn-primary setting-page-btn"
                  >
                    <FormattedMessage id="BUSINESS.YES" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




export function PermissionDev(props) {

  const [tasks, setTasks] = React.useState([]);
  let listPermission = [];
  React.useEffect(() => {
    const tempArr = listPermission.map((el, index) => {
      return {
        ...el,
        permission: el.permission,
        ID: index + 1,
      };
    });
    setTasks(tempArr);
  }, [listPermission]);
  const [rolelist, setRole] = useState([]);



//change this code
  return (
    <div className="clearfix">
      <DataGrid
        dataSource={tasks}
        keyExpr="ID"
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        showBorders={true}
        scrolling={true}
        visible={tasks && tasks.length === 0 ? false : true}
      >
        <ColumnFixing enabled={true} />
        <Grouping autoExpandAll={autoExpandAll} />
        <Column caption={"Name"} cellRender={NameUI} width={230} fixed={true} />
        {
          rolelist.map(el => {
            return (
              <Column caption={el.name} cellRender={checkBoxUI} />
            )
          })
        }
        <Column dataField="category" dataType="string" groupIndex={0} />
      </DataGrid>

    </div>
  );


  function NameUI(item) {
    const { data } = item;
    return (
      data.permission.map(el => {
        return (
          <div className="d-block permission-info">
            {el.name}
          </div>
        )
      })
    );
  }


  function checkBoxUI(item) {
    const { data, columnIndex } = item;
    return (
      <div className="d-block w-100 tab-inner-content-details">
        {data.permission.map((perItem, j) => {
          return (
            <div key={j}>
              <div className="row align-items-center flex-nowrap">
                {perItem.role
                  ? perItem.role.map((roleitem, k) => {
                    if (k + 2 === columnIndex) {
                      return (
                        <div className="col col-xl-2" key={k}>
                          <div className="permission-check-box d-block w-100 text-center">
                            <Checkbox01
                              checked={
                                roleitem.permission_ids.findIndex(
                                  (pid) => pid._id === perItem._id
                                ) !== -1
                              }
                              permission_id={perItem._id}
                              roleIndex={k}
                            />
                          </div>
                        </div>
                      );
                    }
                    else {
                      return;
                    }



                  })
                  : ""}


              </div>
              <hr className="my-0 row" />
            </div>
          );
        })}
      </div>
    )
  }
}

export function Checkbox01(props) {
  const { checked, permission_id, handleChangeCheckBox, roleIndex } = props;
  const [state, setState] = useState({
    checkedB: checked || false,
  });
  const handleChange = (event) => {
    setState({ ...state, checkedB: event.target.checked });
    handleChangeCheckBox(event.target.checked, permission_id, roleIndex);
  };
  return (
    <div className="d-block">
      <div className="checkbox-permission-custom">
        <label className="container">
          <input
            type="checkbox"
            onChange={handleChange}
            checked={state.checkedB}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}