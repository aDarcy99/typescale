import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { v4 as uuid } from "uuid";
//assets
import TrashIcon from "../assets/TrashIcon";
//components
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Box,
  Collapse,
  Typography,
} from "@material-ui/core";
import TypeScaleItem from "../components/TypeScaleItem/TypeScaleItem";
import CodeBlock from "../components/CodeBlock/CodeBlock";

const useStyles = makeStyles((theme) => ({
  settingsContainer: {
    margin: `${theme.spacing(2)}px 0`,
  },
  typeScaleContainer: {
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
  typeScaleDisplayText: {
    flexGrow: 1,
    minWidth: "75px",
    margin: `0 ${theme.spacing(2)}px`,
    transition: "all 0.5s",
    transitionDelay: "0.09s",
  },
  clearButton: {
    margin: `${theme.spacing(1)}px`,
    alignSelf: "flex-start",
  },
  newVariantButton: {
    margin: `${theme.spacing(2)}px`,
  },
  resetAllButton: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px 0`,
  },
  input: {
    margin: `${theme.spacing(1)}px 0`,
  },
  minimizeCodeButton: {
    margin: `${theme.spacing(1)}px 0`,
  },
}));

const HomePage = (props) => {
  const classes = useStyles();

  const [baseSize, setBaseSize] = useState(17);
  const [scale, setScale] = useState(1.333);
  const [font, setFont] = useState();
  const [typeScale, setTypeScale] = useState(getDefaultTypeScale());
  const [expandCode, setexpandCode] = useState(false);

  function onBaseSizeChange(Event) {
    setBaseSize(Number(Event.target.value));
  }

  function onScaleChange(Event) {
    setScale(Event.target.value);
  }

  function onFontChange(Event) {
    setFont(Event.target.value);
  }
  function onExpandCodeClick() {
    setexpandCode(!expandCode);
  }

  function onDisplayTextClick(position) {}

  function onNewVariantClick(position) {
    return () => {
      if (position == "top") {
        const position = typeScale[0].position + 1;
        setTypeScale([
          createTypeScaleVariant({
            size: typeScale[0].size * scale,
            position,
            isRemovable: true,
          }),
          ...typeScale,
        ]);
      } else if (position == "bottom") {
        const position = typeScale[typeScale.length - 1].position - 1;
        setTypeScale([
          ...typeScale,
          createTypeScaleVariant({
            size: baseSize * Math.pow(scale, position),
            position,
            isRemovable: true,
          }),
        ]);
      }
    };
  }

  function onVariantDelete(position) {
    return (Event) => {
      if (position != 0) {
        setTypeScale(
          typeScale.filter((variant) => position !== variant.position)
        );
      }
    };
  }

  function onResetAllClick() {
    setTypeScale(getDefaultTypeScale());
  }

  function createTypeScaleVariant({
    size = 16,
    text = "The quick brown Fox.",
    font = "Roboto",
    position = 0,
  }) {
    return {
      id: uuid(),
      size: parseFloat(size.toFixed(2)),
      text,
      font,
      position,
    };
  }

  function getDefaultTypeScale() {
    let variants = [
      createTypeScaleVariant({ size: baseSize, position: 0 }),
      createTypeScaleVariant({ size: baseSize / scale, position: -1 }),
    ];
    let lastSize = baseSize;
    for (let i = 0; i < 6; i++) {
      const currentSize = lastSize * scale;
      variants.unshift(
        createTypeScaleVariant({ size: currentSize, position: i + 1 })
      );
      lastSize = currentSize;
    }
    return variants;
  }

  function renderTypeScale() {
    return typeScale.map((item, itemIdx) => (
      <TypeScaleItem
        key={itemIdx}
        length={typeScale.length}
        idx={itemIdx}
        text={item.text}
        font={item.font}
        size={item.size}
        position={item.position}
        onDeleteButtonClick={onVariantDelete(item.position)}
      />
    ));
  }

  function updateTypeScale() {
    return typeScale.map((variant, variantIdx) =>
      createTypeScaleVariant({
        size: baseSize * Math.pow(scale, variant.position),
        position: variant.position,
      })
    );
  }
  useEffect(() => {
    setTypeScale(updateTypeScale());
  }, [baseSize, scale, font]);

  return (
    <main>
      <Grid container>
        <Grid
          item
          component="aside"
          xs={12}
          md={2}
          className={classes.settingsContainer}
        >
          <Container>
            <Typography component="h1" variant="h6">
              Type Scale Creator
            </Typography>
            <TextField
              type="number"
              variant="outlined"
              placeholder="16"
              label="Base Size"
              className={classes.input}
              value={baseSize}
              onChange={onBaseSizeChange}
            />
            <TextField
              type="number"
              variant="outlined"
              placeholder="1.333"
              label="Scale"
              className={classes.input}
              value={scale}
              onChange={onScaleChange}
            />
            <TextField
              type="text"
              variant="outlined"
              placeholder="Open Sans"
              label="Font"
              className={classes.input}
              value={font}
              onChange={onFontChange}
            />
            <Grid>
              <Button
                className={classes.resetAllButton}
                onClick={onResetAllClick}
                variant="outlined"
              >
                Reset All
              </Button>
            </Grid>
            <Divider />
            <Button
              className={classes.minimizeCodeButton}
              onClick={onExpandCodeClick}
            >
              {expandCode ? "minimize code" : "expand code"}
            </Button>
            <Collapse in={expandCode}>
              <CodeBlock
                content={[
                  getCodeBlockContent("css", typeScale),
                  getCodeBlockContent("jsObject", typeScale),
                ]}
              />
            </Collapse>
          </Container>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid container item xs={12} md={9} direction="column">
          <Button
            variant="outlined"
            className={classes.newVariantButton}
            onClick={onNewVariantClick("top")}
          >
            Add larger
          </Button>
          {renderTypeScale()}
          <Button
            variant="outlined"
            className={classes.newVariantButton}
            onClick={onNewVariantClick("bottom")}
          >
            Add Smaller
          </Button>
        </Grid>
      </Grid>
    </main>
  );
};

export default HomePage;

/*
  scale type: linear or non-linear // geometric sequence
  ----
  typescale: [
    {
      position: ?,
      text: "The quick brown fox",
      fontSize: {
        em: 1.2, 
        px: 17
      },
      fontFamily: "Roboto",
    }
  ]
  ----
  css output, object output
  ----
  
*/

function getCodeBlockContent(format, typescale) {
  switch (format) {
    case "css":
      return `
        //set document font-size to base size
        
      `;
    case "jsObject":
      return `[
        ${typescale.map(
          (variant) =>
            `{
          position: "${variant.position}"
          font: "${variant.font}", 
          size: "${variant.size}"
        }`
        )}
      ]`;
    default:
      console.error("Code Block content requires format paramater");
      break;
  }
}
