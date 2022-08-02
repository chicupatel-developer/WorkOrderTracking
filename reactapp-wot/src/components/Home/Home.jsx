import React from "react";
import "./style.css";

const Home = () => {
  return (
    <div className="mainContainer">
      <div className="homePageHeader">
        <h3>WorkOrder-Tracking</h3>
        <h5>
          MVC Core, Asp.Net Core Identity, Razor / Web API Core / EF Core / SQL
          Server / Angular / React / JWT Authentication
        </h5>
      </div>
      <hr />
      <p></p>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div>
            <div className="titleHeader">
              <b>Login [Any Registered User]</b>
            </div>
            <p></p>
            <div className="titleBody">
              <ul>
                <li>Custom JWT Authentication (UserName/Password)</li>
              </ul>
            </div>
            <p></p>
          </div>
          <div>
            <div className="titleHeader">
              <b>Registration</b>
            </div>
            <p></p>
            <div className="titleBody">
              <ul>
                <li>[Admin] Role - Maps User's Profile with Admin Role</li>
                <li>
                  [Operator] Role - Maps User's Profile with Operator Role
                </li>
              </ul>
            </div>
            <p></p>
          </div>
          <div>
            <div className="titleHeader">
              <b>Parts [Role: Admin]</b>
            </div>
            <p></p>
            <div className="titleBody">
              <ul>
                <li>View - Filter List of Parts</li>
                <li>Add / Edit / Delete - Part</li>
                <li>Add / Edit - Part Image</li>
              </ul>
            </div>
            <p></p>
          </div>
          <div>
            <div className="titleHeader">
              <b>Work-Orders [Role: Admin]</b>
            </div>
            <p></p>
            <div className="titleBody">
              <ul>
                <li>View - Filter List of Work Orders</li>
                <li>Add / Edit / Delete - Work Order</li>
                <li>View Customer Order Details</li>
                <li>View List of Operations Connected with Work Order</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mx-auto">
          <div>
            <div className="titleHeader">
              <b>Work Order --&gt; Operations [Role: Admin]</b>
            </div>
            <p></p>
            <div className="titleBody">
              <ul>
                <li>Create New Operation for Work Order</li>
                <li>Edit Operation for Work Order</li>
                <li>Transfer Parts for Operation</li>
                <li>View History of Parts Transfer for Operation</li>
                <li>
                  View Operation Log
                  <br />
                  <ul>
                    <li>
                      [Operator, Start-Time, Pause-Time, Cycle-Time, Qty-Done]
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="titleHeader">
              <b>Customer-Orders [Role: Admin]</b>
            </div>
            <p></p>
            <div className="titleBody">
              <ul>
                <li>View - Filter List of Customer Orders</li>
                <li>Add / Edit / Delete - Customer Order</li>
                <li>
                  View Customer Order Progress [Text] Report Data
                  <br />
                  <ul>
                    <li>
                      View Customer Order v/s Operations Progress [Chart -
                      google chart api] Report
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="titleHeader">
              <b>Operator Log [Role: Operator]</b>
            </div>
            <p></p>
            <div className="titleBody">
              <ul>
                <li>Create Operator Log</li>
                <li>View Today's Activity Log</li>
                <li>View Current Week's Activity Log</li>
                <li>View Current Month's Activity Log</li>
                <li>View Previous Month's Activity Log</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
