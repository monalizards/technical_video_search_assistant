import { useState } from "react";
import {
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";

const InVideoSearch = ({ onSubmit }) => {
  const searchTypes = {
    search: "search",
    qa: "qa",
  };
  const [searchType, setSearchType] = useState(searchTypes.search);
  const [queryContent, setQueryContent] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchType, queryContent);
  };

  const onSwitchChange = (e) => {
    setSearchType(
      searchType === searchTypes.search ? searchTypes.qa : searchTypes.search
    );
  };

  return (
    <div>
      <form
        onSubmit={onFormSubmit}
        style={{ display: "inline", width: "100%" }}
      >
        <FormGroup>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Keyword/Phase</Grid>
              <Grid item>
                <Switch
                  checked={searchType === searchTypes.qa}
                  onChange={onSwitchChange}
                  name="searchType"
                />
              </Grid>
              <Grid item>Q.A.</Grid>
            </Grid>
          </Typography>
          <TextField
            variant="filled"
            fullWidth
            size="small"
            value={queryContent}
            onChange={(e) => setQueryContent(e.target.value)}
            className="input-no-padding"
          />
        </FormGroup>
      </form>
    </div>
  );
};

export default InVideoSearch;
