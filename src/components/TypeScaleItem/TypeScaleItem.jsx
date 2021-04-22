import React from "react";
import { makeStyles } from "@material-ui/styles";
//assets
import TrashIcon from "../../assets/TrashIcon";
//components
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typeScaleVariantWrapper: {
    margin: `0 ${theme.spacing(1)}px`,
    borderTop: `1px dotted ${theme.palette.grey[800]}`,
    transition: "all 0.4s",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
      cursor: "pointer",
    },
  },
  typeScaleText: {
    minWidth: "100px",
    padding: `0 ${theme.spacing(1)}px`,
  },
  exampleText: {
    flexGrow: 1,
    minWidth: "75px",
    margin: `0 ${theme.spacing(2)}px`,
    transition: "all 0.5s",
    transitionDelay: "0.09s",
  },
  deleteButton: {
    margin: `${theme.spacing(1)}px`,
    alignSelf: "flex-start",
  },
}));

const TypeScaleItem = ({
  size,
  position,
  text,
  font,
  idx,
  length,
  onDeleteButtonClick,
}) => {
  const classes = useStyles();

  function renderDeleteButton() {
    /* If variant is the largest or smallest and not position 0 in the typescale provide delete button */
    return (idx === length - 1 || idx === 0) && position !== 0 ? (
      <TrashIcon
        onClick={onDeleteButtonClick}
        className={classes.deleteButton}
      />
    ) : (
      ""
    );
  }

  return (
    <Grid key={idx} container item className={classes.typeScaleVariantWrapper}>
      <Grid container item direction="row" alignItems="center">
        {/* */}
        <Typography variant="body2" className={classes.typeScaleText}>
          {position} | {size}px
        </Typography>
        {/* Display Text */}
        <Typography
          className={classes.exampleText}
          style={{ fontSize: `${size}px` }}
        >
          {text}
        </Typography>
        {renderDeleteButton()}
      </Grid>
    </Grid>
  );
};

export default TypeScaleItem;
