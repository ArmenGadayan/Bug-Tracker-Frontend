import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../services/api.json";
import AuthContext from "../context/AuthContext";
import Multiselect from "multiselect-react-dropdown";

const MembersSelect = ({ selectedMembers, handleMembers }) => {
  const [users, setUsers] = useState([]);

  let { token } = useContext(AuthContext);

  useEffect(() => {
    let getUsers = async () => {
      try {
        const response = await axios.get(
          config.apiEndpoint + "/api/all-users/",
          {
            headers: { Authorization: "JWT " + token.access },
          }
        );
        setUsers(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    getUsers();
  }, [token.access]);

  const getOptions = () => {
    let options = [];
    users.map((user) =>
      options.push({
        name: `${user.first_name} ${user.last_name}`,
        id: user.id,
      })
    );
    return options;
  };

  const getSelected = () => {
    let selectedList = [];
    if (selectedMembers) {
      selectedMembers.map((s) =>
        selectedList.push({ name: `${s.first_name} ${s.last_name}`, id: s.id })
      );
    }
    return selectedList;
  };

  const onSelect = (selectedList, selectedItem) => {
    handleMembers(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    handleMembers(selectedList);
  };

  return (
    <Multiselect
      options={getOptions()} // Options to display in the dropdown
      hideSelectedList
      selectedValues={getSelected()} // Preselected value to persist in dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
      showCheckbox
    />
  );
};

export default MembersSelect;
