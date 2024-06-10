/* eslint-disable no-eval */
import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function App(): JSX.Element {
  const [input, setInput] = useState<string>("0");
  const [isDecimal, setIsDecimal] = useState<boolean>(false);

  const operators: string[] = ["-", "+", "*", "/"];

  const getLastLetter = (): string => {
    return input.toString().slice(-1);
  };

  const handleClick = (value: string): void => {
    if (input === "0") {
      setInput("");
    }

    if (operators.includes(value)) {
      if (operators.includes(getLastLetter()) && value !== "-") {
        for (let i = input.length - 1; i !== 0; i--) {
          if (operators.includes(input.charAt(i))) {
            setInput((prev) => prev.slice(0, i + 1));
          }
        }
        setInput((prev) => prev.slice(0, -1));
      }

      setIsDecimal(false);
      setInput((prev) => prev + value);
      return;
    }

    switch (value) {
      case "C":
        setInput("0");
        setIsDecimal(false);
        return;

      case "=":
        try {
          setInput(eval(input));
        } catch (error) {
          console.error(error);
        }

        setIsDecimal(false);
        return;

      case ".":
        if (!isDecimal) {
          setInput((prev) => prev + value);
          setIsDecimal(true);
        }
        return;
    }

    setInput((prev) => prev + value);
  };

  const buttons = [
    { id: "zero", value: "0" },
    { id: "one", value: "1" },
    { id: "two", value: "2" },
    { id: "three", value: "3" },
    { id: "four", value: "4" },
    { id: "five", value: "5" },
    { id: "six", value: "6" },
    { id: "seven", value: "7" },
    { id: "eight", value: "8" },
    { id: "nine", value: "9" },
    { id: "add", value: "+" },
    { id: "subtract", value: "-" },
    { id: "multiply", value: "*" },
    { id: "divide", value: "/" },
    { id: "decimal", value: "." },
    { id: "clear", value: "C" },
    { id: "equals", value: "=" },
  ];

  return (
    <Card
      sx={{
        textAlign: "center",
        margin: "auto",
        maxWidth: 400,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          id="display"
          mb={2}
          bgcolor={(theme) => theme.palette.grey[300]}
        >
          {input}
        </Typography>

        <Grid container spacing={2}>
          {buttons.map((button, id) => (
            <Grid item xs={4} key={id}>
              <Button
                id={button.id}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleClick(button.value)}
              >
                {button.value}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default App;
