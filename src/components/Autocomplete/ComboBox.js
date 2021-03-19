/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox({ attributes, behaviour, handleChange }) {
  //   const [opts, setOpts] = useState({});
  const { id, text } = attributes;
  const { response, key } = behaviour;
  const { handleOptions, handleItem } = handleChange;
  return (
    <Autocomplete
      id={id}
      options={response}
      getOptionLabel={(option) => {
        const result = option ? option[key] : "";
        return result;
      }}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label={text} variant="outlined" />
      )}
      // This apply when item is selected
      onChange={handleItem}
      // This apply when input value change. Use it for change filter options
      onInputChange={handleOptions}
    />
  );
}
