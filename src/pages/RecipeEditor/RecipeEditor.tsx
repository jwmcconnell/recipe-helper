import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { ReactElement } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";

type IngredientInput = {
  name?: string;
  measurement?: string;
  amount?: number;
};

type StepInput = {
  name?: string;
  description?: string;
};

type RecipeInputs = {
  title: string;
  description?: string;
  ingredients: Array<IngredientInput>;
  steps: Array<StepInput>;
};

type UseSortableReturn = Omit<
  ReturnType<typeof useSortable>,
  "setNodeRef" | "transform" | "transition"
>;

function SortableItem(
  props: Readonly<{
    id: string;
    children: (args: UseSortableReturn) => React.ReactNode;
  }>
) {
  const { setNodeRef, transform, transition, ...rest } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children({ ...rest })}
    </div>
  );
}

export function RecipeEditor(): ReactElement {
  const { register, handleSubmit, control } = useForm<RecipeInputs>({
    defaultValues: { ingredients: [{}], steps: [{}] },
  });
  const onSubmit: SubmitHandler<RecipeInputs> = (data) => {
    console.log(data);
  };
  const {
    fields: ingredientsFields,
    move: moveIngredient,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "ingredients", // unique name for your Field Array
  });
  const {
    fields: stepsFields,
    move: moveStep,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "steps", // unique name for your Field Array
  });

  const modifiers = [restrictToVerticalAxis, restrictToParentElement];

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction={"column"} maxWidth={1000}>
        {/* <input defaultValue="New Recipe" {...register("example")} /> */}
        <TextField
          label="Title"
          {...register("title", { required: true })}
          sx={{ m: 1 }}
        />

        <TextField
          label="Description"
          multiline
          minRows={3}
          {...register("description")}
          sx={{ m: 1 }}
        />

        <Typography variant="h6" sx={{ m: 1 }}>
          Ingredients
        </Typography>
        <Box>
          <DndContext
            modifiers={modifiers}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (over && active.id !== over?.id) {
                const activeIndex = active.data.current?.sortable?.index;
                const overIndex = over.data.current?.sortable?.index;
                console.log({ activeIndex, overIndex });
                if (activeIndex !== undefined && overIndex !== undefined) {
                  moveIngredient(activeIndex, overIndex);
                }
              }
            }}
          >
            <SortableContext items={ingredientsFields}>
              {ingredientsFields.map((field, index) => {
                return (
                  <React.Fragment key={field.id}>
                    <SortableItem id={field.id}>
                      {({ attributes, listeners }) => (
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"left"}
                          alignItems={"center"}
                          sx={{ m: 1 }}
                        >
                          <IconButton
                            sx={{ m: 1 }}
                            {...attributes}
                            {...listeners}
                          >
                            <DragHandleIcon />
                          </IconButton>

                          <TextField
                            label="Ingredient"
                            {...register(`ingredients.${index}.name`, {
                              required: true,
                            })}
                            sx={{ m: 1 }}
                          />

                          <TextField
                            label="Measurement"
                            {...register(`ingredients.${index}.measurement`)}
                            sx={{ m: 1 }}
                          />

                          <TextField
                            label="Amount"
                            type="number"
                            sx={{ m: 1 }}
                            {...register(`ingredients.${index}.amount`)}
                          />

                          <IconButton
                            color="error"
                            onClick={() => removeIngredient(index)}
                            sx={{ m: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      )}
                    </SortableItem>
                  </React.Fragment>
                );
              })}
            </SortableContext>
          </DndContext>
        </Box>

        <Grid>
          <Button
            color="success"
            sx={{ m: 1 }}
            onClick={() => appendIngredient({})}
          >
            <Typography>Add Ingredient</Typography>
          </Button>
        </Grid>

        <Typography variant="h6" sx={{ m: 1 }}>
          Steps
        </Typography>

        <Box>
          <DndContext
            modifiers={modifiers}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (over && active.id !== over?.id) {
                const activeIndex = active.data.current?.sortable?.index;
                const overIndex = over.data.current?.sortable?.index;
                console.log({ activeIndex, overIndex });
                if (activeIndex !== undefined && overIndex !== undefined) {
                  moveStep(activeIndex, overIndex);
                }
              }
            }}
          >
            <SortableContext items={stepsFields}>
              {stepsFields.map((field, index) => {
                return (
                  <React.Fragment key={field.id}>
                    <SortableItem id={field.id}>
                      {({ attributes, listeners }) => (
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"left"}
                          alignItems={"center"}
                          sx={{ m: 1 }}
                        >
                          <IconButton
                            sx={{ m: 1 }}
                            {...attributes}
                            {...listeners}
                          >
                            <DragHandleIcon />
                          </IconButton>

                          <Grid
                            container
                            direction={"column"}
                            sx={{ width: 600, margin: 1 }}
                          >
                            <TextField
                              label="Title"
                              {...register(`steps.${index}.name`, {
                                required: true,
                              })}
                              sx={{ m: 1, width: 300 }}
                            />

                            <TextField
                              multiline
                              minRows={2}
                              label="Description"
                              {...register(`steps.${index}.description`)}
                              sx={{ m: 1, width: "100%" }}
                            />
                          </Grid>

                          <IconButton
                            color="error"
                            onClick={() => removeStep(index)}
                            sx={{ m: 2 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      )}
                    </SortableItem>
                  </React.Fragment>
                );
              })}
            </SortableContext>
          </DndContext>
        </Box>

        <Grid>
          <Button color="success" sx={{ m: 1 }} onClick={() => appendStep({})}>
            <Typography>Add Step</Typography>
          </Button>
        </Grid>

        <Grid>
          <Button type="submit" sx={{ m: 1 }}>
            <Typography>Submit</Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
