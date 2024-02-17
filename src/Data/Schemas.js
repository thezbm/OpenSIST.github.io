import univList from "./UnivList.json";
import {amber, blue, green, grey, indigo, lime, pink, purple, red, teal} from "@mui/material/colors";

export const DescriptionTemplate = `## 项目介绍

* 待补充

## 录取偏好/条件

* 待补充

## 其他注意事项

* 例：网申材料、套磁等
`

export function list2Options(list) {
    return list.map((item) => {
        return {
            value: item,
            label: item
        }
    })
}

export function dict2Options(dict) {
    return Object.entries(dict).map(([key, value]) => {
        return {
            value: key,
            label: value
        }
    })
}

export const majorList = ['CS', 'EE', 'IE'];
export const majorOptions = list2Options(majorList);

export const degreeList = ['Master', 'PhD'];
export const degreeOptions = list2Options(degreeList);

export const regionList = ['US', 'CA', 'EU', 'UK', 'HK', 'SG', 'Others']
export const regionOptions = list2Options(regionList);

const sortedUnivList = [...univList].sort((a, b) => {
    return a['fullName'].localeCompare(b['fullName']);
});

export const univOptions = sortedUnivList.map((univ) => {
    return {
        value: univ['abbr'],
        label: univ['fullName'] === univ['abbr'] ? `${univ['fullName']}` : `${univ['fullName']} (${univ['abbr']})`,
        region: univ['region'],
    }
});

export const genderMapping = {
    'Male': '男',
    'Female': '女',
    'Others': 'LGBTQ+'
}

export const genderOptions = dict2Options(genderMapping);

export const currentDegreeMapping = {
    'Undergraduate': '本科生',
    'Master': '硕士生',
}
export const currentDegreeOptions = dict2Options(currentDegreeMapping);

export const applicationYearOptions = Array.from({length: 10}, (_, i) => {
    const year = 2016 + i;
    return {value: year, label: `${year}`};
});

export const rankPercentOptions = [
    {value: '1', label: 'Top 1%'},
    {value: '3', label: 'Top 3%'},
    {value: '5', label: 'Top 5%'},
    {value: '10', label: 'Top 10%'},
    {value: '15', label: 'Top 15%'},
    {value: '20', label: 'Top 20%'},
    {value: '30', label: 'Top 30%'},
    {value: '40', label: 'Top 40%'},
    {value: '50', label: 'Top 50%'},
    {value: '50+', label: 'Top 50%+'},
];

export const rankPercentSliderValueMapping = {
    '1': 95,
    '3': 90,
    '5': 85,
    '10': 80,
    '15': 75,
    '20': 70,
    '30': 60,
    '40': 50,
    '50': 40,
    '50+': 30,
}

export const SliderValueRankStringMapping = {
    95: "Top 1%",
    90: "Top 3%",
    85: "Top 5%",
    80: "Top 10%",
    75: "Top 15%",
    70: "Top 20%",
    60: "Top 30%",
    50: "Top 40%",
    40: "Top 50%",
    30: "Top 50%+",
}

export const englishOptions = list2Options(['TOEFL', 'IELTS']);

export const exchangeDurationOptions = [
    {value: 'Semester', label: '一学期'},
    {value: 'Year', label: '一学年'}
]

export const exchangeUnivList = [
    'MIT',
    'UCB',
    'UMich',
    'Cornell',
    'UW-Madison',
    'UPenn',
    'Yale',
    'Harvard',
    'UIUC',
    'UChicago',
    'Hebrew',
    'Drexel',
    'Padua'
]

export const publicationTypeOptions = [
    {value: 'Journal', label: '期刊'},
    {value: 'Conference', label: '会议'},
    {value: 'Workshop', label: 'Workshop'}
]

export const publicationStatusOptions = [
    {value: 'Accepted', label: '已录用'},
    {value: 'UnderReview', label: '在投'}
]

export const authorOrderOptions = [
    {value: 'First', label: '第一作者'},
    {value: 'Co-first', label: '共同第一作者'},
    {value: 'Second', label: '第二作者'},
    {value: 'Co-second', label: '共同第二作者'},
    {value: 'Other', label: '其他'}
]

export const recommendationTypeOptions = [
    {value: 'Research', label: '科研推'},
    {value: 'Course', label: '课程推'},
    {value: 'TA', label: 'TA推'},
    {value: 'Internship', label: '实习推'},
    {value: 'Competition', label: '竞赛推'}
]

export const recordStatusList = ['Admit', 'Reject', 'Waitlist', 'Defer']
export const recordStatusOptions = list2Options(recordStatusList);

export const recordSemesterList = ['Fall', 'Spring', 'Summer', 'Winter']
export const recordSemesterOptions = list2Options(recordSemesterList);

export const EnglishExamMapping = {
    GRE: {
        'Total': 'GRE 总分',
        'V': 'GRE 语文',
        'Q': 'GRE 数学',
        'AW': 'GRE 写作',
    },
    TOEFL: {
        'Total': 'TOEFL 总分',
        'R': 'TOEFL 阅读',
        'L': 'TOEFL 听力',
        'S': 'TOEFL 口语',
        'W': 'TOEFL 写作',
    },
    IELTS: {
        'Total': 'IELTS 总分',
        'R': 'IELTS 阅读',
        'L': 'IELTS 听力',
        'S': 'IELTS 口语',
        'W': 'IELTS 写作',
    },
    EnglishProficiency: {
        'Total': '总分',
        'R': '阅读',
        'L': '听力',
        'S': '口语',
        'W': '写作',
    }
}

export const PublicationTypeChipPalette = {
    'Conference': pink,
    'Journal': red,
    'Workshop': lime,
}

export const PublicationAuthorOrderChipPalette = {
    'First': purple,
    'Co-first': green,
    'Second': indigo,
    'Co-second': blue,
    'Other': grey,
}

export const PublicationStateChipPalette = {
    'Accepted': teal,
    'UnderReview': amber,
}

export function PublicationTypeChipColor(dark, type) {
    return PublicationTypeChipPalette[type][dark ? 700 : 300];
}

export function PublicationAuthorOrderChipColor(dark, order) {
    return PublicationAuthorOrderChipPalette[order][dark ? 700 : 300];
}

export function PublicationStateChipColor(dark, state) {
    return PublicationStateChipPalette[state][dark ? 700 : 300];
}