import { useState } from "react";
import {
  Paper,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
// import server from "../apis/server";
import "./InVideoSearch.css";

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

const searchTypes = {
  search: "search",
  qa: "qa",
};

const InVideoSearch = () => {
  const [request, setRequest] = useState({
    type: searchTypes.search,
    content: "",
  });

  // handle form changes
  const onSwitchChange = (e) => {
    setRequest({
      ...request,
      type:
        request.type === searchTypes.search
          ? searchTypes.qa
          : searchTypes.search,
    });
  };

  const onInputChange = (e) => {
    setRequest({
      ...request,
      content: e.target.value,
    });
  };

  // handle form submission
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(request);
    // onSubmit(searchType, queryContent);
    setRequest({ ...request, content: "" });
  };

  return (
    <Paper>
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <h6>Search history</h6>
        </div>
        {/* History */}
        <div className="card-content">
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod ab
            quae, minus distinctio quas libero earum, ipsa laudantium eveniet id
            qui, a recusandae maxime sequi aut. Ut, sapiente nobis.
          </div>
        </div>
        {/* Searchbar */}
        <div className="card-actions">
          <form
            onSubmit={onFormSubmit}
            style={{ display: "inline", width: "100%" }}
          >
            <FormGroup className="form-group">
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Keyword/Phase</Grid>
                  <Grid item>
                    <Switch
                      checked={request.type === searchTypes.qa}
                      onChange={onSwitchChange}
                      name="type"
                    />
                  </Grid>
                  <Grid item>Q.A.</Grid>
                </Grid>
              </Typography>
              <TextField
                variant="filled"
                size="small"
                value={request.content}
                onChange={onInputChange}
                className="input-no-padding"
              />
            </FormGroup>
          </form>
        </div>
      </div>
    </Paper>
  );
};

export default InVideoSearch;
