import React from "react";
import PieChartComponent from "./common/PieChart";

const AllCharts = ({ data }) => {
  const getPriorityData = () => {
    let priorityData = [
      { name: "Low", value: 0 },
      { name: "Medium", value: 0 },
      { name: "High", value: 0 },
    ];

    let tickets = data;

    tickets.forEach((t) => {
      if (t.priority === "Low") {
        priorityData[0].value += 1;
      } else if (t.priority === "Medium") {
        priorityData[1].value += 1;
      } else if (t.priority === "High") {
        priorityData[2].value += 1;
      }
    });

    priorityData.forEach((element, index) => {
      priorityData[index].value = Math.round(
        (element.value / tickets.length) * 100
      );
    });

    return priorityData;
  };

  const getStatusData = () => {
    let statusData = [
      { name: "New", value: 0 },
      { name: "In Progress", value: 0 },
      { name: "Resolved", value: 0 },
      { name: "Additional Info Required", value: 0 },
    ];

    let tickets = data;
    tickets.forEach((t) => {
      if (t.status === "New") {
        statusData[0].value += 1;
      } else if (t.status === "In Progress") {
        statusData[1].value += 1;
      } else if (t.status === "Resolved") {
        statusData[2].value += 1;
      } else if (t.status === "Additional Info Required") {
        statusData[3].value += 1;
      }
    });

    statusData.forEach((element, index) => {
      statusData[index].value = Math.round(
        (element.value / tickets.length) * 100
      );
    });

    return statusData;
  };

  const getTypeData = () => {
    let typeData = [
      { name: "Bug", value: 0 },
      { name: "Feature Request", value: 0 },
      { name: "Other", value: 0 },
    ];

    let tickets = data;
    tickets.forEach((t) => {
      if (t.type === "Bug") {
        typeData[0].value += 1;
      } else if (t.type === "Feature Request") {
        typeData[1].value += 1;
      } else if (t.type === "Other") {
        typeData[2].value += 1;
      }
    });

    typeData.forEach((element, index) => {
      typeData[index].value = Math.round(
        (element.value / tickets.length) * 100
      );
    });

    return typeData;
  };

  return (
    <div>
      <div className="row">
        {data && (
          <div>
            <div className="chart-header">Priority</div>{" "}
            <PieChartComponent data={getPriorityData()} />
          </div>
        )}
        {data && (
          <div>
            <div className="chart-header">Status</div>{" "}
            <PieChartComponent data={getStatusData()} />
          </div>
        )}
        {data && (
          <div>
            <div className="chart-header">Type</div>{" "}
            <PieChartComponent data={getTypeData()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCharts;
