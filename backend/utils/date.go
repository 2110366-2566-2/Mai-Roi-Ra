package utils

import (
	"fmt"
	"strconv"
	"time"
)

type Weekday int

const (
	Sunday Weekday = iota
	Monday
	Tuesday
	Wednesday
	Thursday
	Friday
	Saturday
)

func (w Weekday) String() string {
	return [...]string{
		"SUN",
		"MON",
		"TUE",
		"WED",
		"THU",
		"FRI",
		"SAT",
	}[w]
}

func OrdinalSuffixOfDay(i int) string {
	j := i % 10
	k := i % 100
	if j == 1 && k != 11 {
		return strconv.Itoa(i) + "st"
	}
	if j == 2 && k != 12 {
		return strconv.Itoa(i) + "nd"
	}
	if j == 3 && k != 13 {
		return strconv.Itoa(i) + "rd"
	}
	return strconv.Itoa(i) + "th"
}

var ShortDayMapToFullDay = map[string]LanguageStruct{
	"SUN": {
		Th: "วันอาทิตย์",
		En: "Sunday",
	},
	"MON": {
		Th: "วันจันทร์",
		En: "Monday",
	},
	"TUE": {
		Th: "วันอังคาร",
		En: "Tuesday",
	},
	"WED": {
		Th: "วันพุธ",
		En: "Wednesday",
	},
	"THU": {
		Th: "วันพฤหัสบดี",
		En: "Thursday",
	},
	"FRI": {
		Th: "วันศุกร์",
		En: "Friday",
	},
	"SAT": {
		Th: "วันเสาร์",
		En: "Saturday",
	},
}

func ToDateString(t time.Time) string {
	return t.Format("20060102")
}

var (
	MonthMapThStr = map[string]string{
		"01": "ม.ค.",
		"02": "ก.พ.",
		"03": "มี.ค.",
		"04": "เม.ย.",
		"05": "พ.ค.",
		"06": "มิ.ย.",
		"07": "ก.ค.",
		"08": "ส.ค.",
		"09": "ก.ย.",
		"10": "ต.ค.",
		"11": "พ.ย.",
		"12": "ธ.ค.",
	}
)
var (
	MonthMapEnStr = map[string]string{
		"01": "Jan",
		"02": "Feb",
		"03": "Mar",
		"04": "Apr",
		"05": "May",
		"06": "Jun",
		"07": "Jul",
		"08": "Aug",
		"09": "Sep.",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec",
	}
)

// return dateTimeTH, dateTimeEN
func FormatDateTimeToEmail(dateTime string) (string, string) {
	dateTimeTH := "-"
	dateTimeEN := "-"
	if dateTime != "" {
		year, err := strconv.Atoi(dateTime[0:4])
		if err != nil {
			fmt.Println("orderYear error:", err)
		}
		yearTH := year + 543
		dateTimeTH = fmt.Sprintf("%v %v %v เวลา %v:%v น.", dateTime[6:8], MonthMapThStr[dateTime[4:6]], yearTH, dateTime[8:10], dateTime[10:12])
		dateTimeEN = fmt.Sprintf("%v %v %v at %v:%v", dateTime[6:8], MonthMapEnStr[dateTime[4:6]], year, dateTime[8:10], dateTime[10:12])
	}
	return dateTimeTH, dateTimeEN
}

// DiffTime ...
func DiffTime(a, b time.Time) (year, month, day, hour, min, sec int) {
	if a.Location() != b.Location() {
		b = b.In(a.Location())
	}
	if a.After(b) {
		a, b = b, a
	}
	y1, M1, d1 := a.Date()
	y2, M2, d2 := b.Date()

	h1, m1, s1 := a.Clock()
	h2, m2, s2 := b.Clock()

	year = int(y2 - y1)
	month = int(M2 - M1)
	day = int(d2 - d1)
	hour = int(h2 - h1)
	min = int(m2 - m1)
	sec = int(s2 - s1)

	// Normalize negative values
	if sec < 0 {
		sec += 60
		min--
	}
	if min < 0 {
		min += 60
		hour--
	}
	if hour < 0 {
		hour += 24
		day--
	}
	if day < 0 {
		// days in month:
		t := time.Date(y1, M1, 32, 0, 0, 0, 0, time.UTC)
		day += 32 - t.Day()
		month--
	}
	if month < 0 {
		month += 12
		year--
	}

	return
}
