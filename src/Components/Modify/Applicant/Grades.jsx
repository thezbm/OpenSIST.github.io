import React, {useState} from "react";
import {Box, Button, Divider, Grid, InputAdornment, Paper, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {englishOptions, rankPercentOptions} from "../../../Data/Schemas";

function Grades({formValues, handleBack, handleNext, handleChange}) {
    const [englishOption, setEnglishOption] = useState('');
    const disableNumberUpDown = {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
    };
    const isError = () => {
        return !formValues.GPA;
    }

    return (
        <Paper variant='outlined' sx={{width: '70%', margin: '10px'}}>
            <Divider textAlign="left">学业成绩</Divider>
            <Grid
                container
                spacing={2}
                sx={{width: '70%', justifyContent: 'center', margin: 0}}
            >
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        name="GPA"
                        label="GPA"
                        variant="outlined"
                        size="small"
                        helperText="注：申请人在该申请季用于申请的最高学历的GPA"
                        required
                        value={formValues.GPA ?? ""}
                        onChange={(event) => {handleChange(event)}}
                        type="number"
                        sx={disableNumberUpDown}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        fullWidth
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                size="small"
                                name="Ranking"
                                label="学院或专业排名"
                                variant="outlined"
                            />
                        }
                        options={rankPercentOptions}
                        value={formValues.Ranking ? rankPercentOptions.find((option) => {
                            return option.value === formValues.Ranking;
                        }) : null}
                        onChange={
                            (event, newInputValue) => {
                                handleChange(event, newInputValue?.value, "Ranking")
                            }
                        }
                    />
                </Grid>
            </Grid>
            <Divider textAlign="left">GRE</Divider>
            <Grid
                container
                spacing={2}
                sx={{width: '70%', justifyContent: 'center', margin: 0}}
            >
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="GRETotal"
                        label="V+Q总分"
                        variant="outlined"
                        size="small"
                        value={formValues.GRETotal === 260 ? "" : formValues.GRETotal}
                        onChange={(event) => {handleChange(event)}}
                        type="number"
                        sx={disableNumberUpDown}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        name="V"
                        label="语文"
                        variant="outlined"
                        size="small"
                        value={formValues.V === 130 ? "" : formValues.V}
                        onChange={(event) => {handleChange(event)}}
                        type="number"
                        sx={disableNumberUpDown}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        name="Q"
                        label="数学"
                        variant="outlined"
                        size="small"
                        value={formValues.Q === 130 ? "" : formValues.Q}
                        onChange={(event) => {handleChange(event)}}
                        type="number"
                        sx={disableNumberUpDown}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        name="AW"
                        label="写作"
                        variant="outlined"
                        size="small"
                        value={formValues.AW || ""}
                        onChange={(event) => {handleChange(event)}}
                        type="number"
                        sx={disableNumberUpDown}
                    />
                </Grid>
            </Grid>
            <Divider textAlign="left">英语成绩</Divider>
            <Grid
                container
                spacing={2}
                sx={{width: '70%', justifyContent: 'center', margin: 0}}
            >
                <Grid item xs={12}>
                    <Autocomplete
                        fullWidth
                        onInputChange={(event, value) => {
                            setEnglishOption(value);
                        }}
                        options={englishOptions}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                size="small"
                                name="EnglishOption"
                                label="选择考试"
                                variant="outlined"
                            />
                        }
                        value={formValues.EnglishOption ? englishOptions.find((option) => {
                            return option.value === formValues.EnglishOption;
                        }) : null}
                        onChange={
                            (event, newInputValue) => {
                                handleChange(event, newInputValue?.value, "EnglishOption")
                            }
                        }
                    />
                </Grid>
                {englishOption.length > 0 ?
                    <>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="EnglishTotal"
                                label="总分"
                                variant="outlined"
                                size="small"
                                value={formValues.EnglishTotal || ""}
                                onChange={(event) => {handleChange(event)}}
                                type="number"
                                sx={disableNumberUpDown}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="R"
                                label="阅读"
                                variant="outlined"
                                size="small"
                                value={formValues.R || ""}
                                onChange={(event) => {handleChange(event)}}
                                type="number"
                                inputProps={{ step: englishOption === "IELTS" ? ".5" : "1" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="L"
                                label="听力"
                                variant="outlined"
                                size="small"
                                value={formValues.L || ""}
                                onChange={(event) => {handleChange(event)}}
                                type="number"
                                inputProps={{ step: englishOption === "IELTS" ? ".5" : "1" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="S"
                                label="口语"
                                variant="outlined"
                                size="small"
                                value={formValues.S || ""}
                                onChange={(event) => {handleChange(event)}}
                                type="number"
                                inputProps={{ step: englishOption === "IELTS" ? ".5" : "1" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="W"
                                label="写作"
                                variant="outlined"
                                size="small"
                                value={formValues.W || ""}
                                onChange={(event) => {handleChange(event)}}
                                type="number"
                                inputProps={{ step: englishOption === "IELTS" ? ".5" : "1" }}
                            />
                        </Grid>
                    </> : null
                }
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 3 }}>
                <Button
                    sx={{ mr: 1 }}
                    variant='contained'
                    onClick={handleBack}
                >
                    上一步
                </Button>
                <Button
                    sx={{ mr: 1 }}
                    variant='contained'
                    onClick={handleNext}
                    disabled={isError()}
                >
                    下一步
                </Button>
            </Box>
        </Paper>
    )
}

export default Grades;