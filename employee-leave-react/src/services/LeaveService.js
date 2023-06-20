import API from "./API";

const LeaveService = {
    getLeaveBalance : async function () {
        return await API.get("/leave/balance");
    },
    getLeaves : async function () {
        return await API.get("/leave/");
    },
    getSingleLeave : async function (id) {
        return await API.post(`/leave/${id}`);
    },
    createLeave : async function (payload) {
        return await API.post("/leave.",payload);
    },
    deleteLeave : async function (id) {
        return await API.delete("/leave/",{ data: {id: id}});
    },
    approveLeave : async function (payload) {
        return await API.put("/leave/approve",payload);
    },
}

export default LeaveService;