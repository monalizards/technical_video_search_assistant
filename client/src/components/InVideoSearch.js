import { useState } from "react";
import {
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import server from "../apis/server";

// const params = (video, searchType, queryContent) => {
//   if (searchType === "search") {
//     return {
//       query: queryContent,
//       text: video.caption_fulltext,
//       sections: video.caption_sections,
//     };
//   } else {
//     return {
//       question: queryContent,
//       text: video.caption_fulltext,
//     };
//   }
// };

// const onFormSubmit = (searchType, queryContent) => {
//   // console.log(searchType, queryContent);
//   // setResult({});
//   server
//     .post(`${searchType}`, (videoResult, searchType, queryContent))
//     .then(({ data }) => {
//       console.log(data);
//       // setResult(data.results);
//       // console.log(result);
//     });
//   // .catch((err) => {
//   //   setError(err.toJSON());
//   //   console.log(error);
//   // });
// };

const InVideoSearch = () => {
  //   const searchTypes = {
  //     search: "search",
  //     qa: "qa",
  //   };
  //   const [searchType, setSearchType] = useState(searchTypes.search);
  //   const [queryContent, setQueryContent] = useState("");

  //   const onFormSubmit = (e) => {
  //     e.preventDefault();
  //     onSubmit(searchType, queryContent);
  //     setQueryContent("");
  //   };

  //   const onSwitchChange = (e) => {
  //     setSearchType(
  //       searchType === searchTypes.search ? searchTypes.qa : searchTypes.search
  //     );
  //   };

  return (
    <div>
      <h1>InVideoSearch</h1>
      {/* <form
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
      </form> */}
    </div>
  );
};

export default InVideoSearch;
