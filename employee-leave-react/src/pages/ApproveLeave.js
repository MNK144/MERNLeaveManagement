import React from "react";

const ApproveLeave = () => {
  return (
    <div>
      <div class="main-content container-fluid">
        <div class="page-title">
          <div class="row">
            <div class="col-12 col-md-6 order-md-1 order-last">
              <h3>Approve Leaves</h3>
            </div>
          </div>
        </div>
        <section class="section">
          <div class="card">
            <div class="card-body">
              <table class="table" id="table1">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Total Days</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Manank Patel</td>
                    <td>Casual Leave</td>
                    <td>2021-11-02</td>
                    <td>2021-11-05</td>
                    <td>3</td>
                    <td>
                      <span class="badge bg-info">Pending</span>
                    </td>
                    <td>
                        <button class="btn btn-primary">Approve</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApproveLeave;
