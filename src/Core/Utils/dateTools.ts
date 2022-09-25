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
    start: string, 
    end: string | undefined = undefined, 
    short: boolean = false
): string => {

    if (!i18n.languages.includes(lang)) lang = "en";

    const startDateObj = new Date(start);
    const endDateObj = end ? new Date(end) : undefined;

    let startMonth, endMonth;
    
    if (short) {
        startMonth = monthNames.find(x => x.code === lang)!.content[startDateObj.getMonth()].short;
        endMonth = end ? monthNames.find(x => x.code === lang)!.content[startDateObj.getMonth()].short : "";
    } else {
        startMonth = monthNames.find(x => x.code === lang)!.content[startDateObj.getMonth()].full;
        endMonth = end ? monthNames.find(x => x.code === lang)!.content[startDateObj.getMonth()].full : "";
    }

    return `${startMonth} ${startDateObj.getFullYear()} - ${endMonth} ${end ? endDateObj?.getFullYear() : ""}`.trimEnd();
}