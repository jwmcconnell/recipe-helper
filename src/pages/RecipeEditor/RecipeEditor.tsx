import { Button, Input, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type RecipeInputs = {
  title: string;
  description: string;
  ingredients: Array<string>;
};

export function RecipeEditor(): ReactElement {
  const { register, handleSubmit } = useForm<RecipeInputs>();
  const onSubmit: SubmitHandler<RecipeInputs> = (data) => {
    console.log(data);
  };

  const [ingredientsCount, setIngredientsCount] = useState<number>(1);

  function handleAddIngredient() {
    setIngredientsCount((prev) => prev + 1);
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction={"column"}>
        {/* <input defaultValue="New Recipe" {...register("example")} /> */}
        <Input
          defaultValue={"New Recipe"}
          {...register("title", { required: true })}
        />

        <Input
          defaultValue={"Description"}
          {...register("description", { required: true })}
        />

        {Array.from({ length: ingredientsCount }).map((_, index) => (
          <Grid key={`ingredient-${index}`}>
            <Input
              defaultValue={`Ingredient ${index + 1}`}
              {...register(`ingredients.${index}`, { required: true })}
            />
            <Button onClick={handleAddIngredient}>
              <Typography>Add Ingredient</Typography>
            </Button>
          </Grid>
        ))}

        <input type="submit" />
      </Grid>
    </form>
  );
}
