import React from "react";

const ApplyLeave = () => {
  return (
    <div>
      <div class="main-content container-fluid">
        <div class="page-title">
          <div class="row">
            <div class="col-12 col-md-6 order-md-1 order-last">
              <h3>Apply for Leave</h3>
            </div>
          </div>
        </div>

        <section id="multiple-column-form">
          <div class="row match-height">
            <div class="col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <form class="form">
                      <div class="row">
                        <div class="col-md-6 col-12">
                          <div class="form-group has-icon-left">
                            <label for="first-name-icon">From Date</label>
                            <div class="position-relative">
                              <input
                                type="date"
                                class="form-control"
                                placeholder="first name"
                                id="first-name-icon"
                              />
                              <div class="form-control-icon">
                                <i class="fa fa-user"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 col-12">
                          <div class="form-group has-icon-left">
                            <label for="first-name-icon">To Date</label>
                            <div class="position-relative">
                              <input
                                type="date"
                                class="form-control"
                                placeholder="first name"
                                id="first-name-icon"
                              />
                              <div class="form-control-icon">
                                <i class="fa fa-user"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 col-12">
                          <div class="form-group has-icon-left">
                            <label for="first-name-icon">
                              Select Leave Type
                            </label>
                            <div class="position-relative">
                              <fieldset class="form-group">
                                <select class="form-select">
                                  <option value="casual">Casual Leave</option>
                                  <option value="sick">Sick Leave</option>
                                  <option value="emergency">Emergency Leave</option>
                                </select>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                        
                        <div class="col-12 d-flex justify-content-end">
                          <button
                            type="submit"
                            class="btn btn-primary me-1 mb-1"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplyLeave;
