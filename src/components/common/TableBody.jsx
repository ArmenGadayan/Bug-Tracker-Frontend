import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.label === "Created") {
      const date = new Date(_.get(item, column.path)).toLocaleDateString()
      return date;
    }

    if (column.label === "Name") {
      return `${item.first_name} ${item.last_name}`
    }

    if (column.label === "Requester" && item.member) {
      return `${item.member.first_name} ${item.member.last_name}`
    }

    if (column.label === "Description" && _.get(item, column.path).length > 75) {
      return  `${_.get(item, column.path).slice(0, 75)}...`
    }

    if (column.label === "Role") {
      if (item.groups && item.groups[0]) {
        return item.groups[0]
      }
      return "N/A"
    }

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
