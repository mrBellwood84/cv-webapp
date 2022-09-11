import i18n from "../../i18n";

interface IDateLib {
    code: string;
    content: {
        full: string;
        short: string;
    }[]
}

export const monthNames: IDateLib[] = [
    {
        code: "no",
        content: [
            {
                full: "Januar",
                short: "Jan"
            },
            {
                full: "Februar",
                short: "Feb"
            },
            {
                full: "Mars",
                short: "Mar"
            },
            {
                full: "April",
                short: "Apr"
            },
            {
                full: "Mai",
                short: "Mai"
            },
            {
                full: "Juni",
                short: "Jun",
            },
            {
                full: "Juli",
                short: "Jul"
            },
            {
                full: "August",
                short: "Aug"
            },
            {
                full: "September",
                short: "Sept",
            },
            {
                full: "Oktober",
                short: "Okt"
            },
            {
                full: "November",
                short: "Nov",
            },
            {
                full: "Desember",
                short: "Des"
            }
        ]
    },
    {
        code: "en",
        content: [
            {
                full: "January",
                short: "Jan"
            },
            {
                full: "February",
                short: "Feb"
            },
            {
                full: "Mars",
                short: "Mar"
            },
            {
                full: "April",
                short: "Apr"
            },
            {
                full: "May",
                short: "May"
            },
            {
                full: "June",
                short: "Jun",
            },
            {
                full: "July",
                short: "Jul"
            },
            {
                full: "August",
                short: "Aug"
            },
            {
                full: "September",
                short: "Sept",
            },
            {
                full: "October",
                short: "Oct"
            },
            {
                full: "November",
                short: "Nov",
            },
            {
                full: "December",
                short: "Dec"
            }
        ]
    }
];

export const createYearMonthSpan = (
    lang:string, 
    start: Date, 
    end: Date | undefined = undefined, 
    short: boolean = false
): string => {

    if (!i18n.languages.includes(lang)) lang = "en"

    let startMonth:string, endMonth: string;

    if (short) {
        startMonth = monthNames.find(x => x.code === lang)!.content[start.getMonth()].short;
        endMonth   = end ? monthNames.find(x => x.code === lang)!.content[end.getMonth()].short : ""
    } else {
        startMonth = monthNames.find(x => x.code === lang)!.content[start.getMonth()].full;
        endMonth   = end ? monthNames.find(x => x.code === lang)!.content[end.getMonth()].full : ""
    }

    return `${startMonth} ${start.getFullYear()} - ${endMonth} ${end ? end.getFullYear() : ""}`.trimEnd();
}