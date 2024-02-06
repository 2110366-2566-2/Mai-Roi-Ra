package utils

import (
	"fmt"
	"math"
	"time"
)

type TimeUtils struct {
	Locale *time.Location
}

func (t *TimeUtils) CurrentTime() time.Time {
	return time.Now().In(t.Locale)
}

func (t *TimeUtils) CurrentDateAtTime() time.Time {
	ctime, _ := time.Parse("20060102", time.Now().In(t.Locale).Format("20060102"))
	return ctime
}

func (t *TimeUtils) CurrentDate() string {
	return time.Now().In(t.Locale).Format("20060102")
}

func (t *TimeUtils) CurrentTomorrowDate() string {
	return time.Now().In(t.Locale).AddDate(0, 0, 1).Format("20060102")
}

func (t *TimeUtils) CurrentDateTime() string {
	return time.Now().In(t.Locale).Format("20060102150405")
}

func (t *TimeUtils) CurrentWithFormat(format string) string {
	return time.Now().In(t.Locale).Format(format)
}

func (t *TimeUtils) GetTimeOffset(ct time.Time) string {
	_, currentOffset := ct.Zone()
	h, _ := time.ParseDuration(fmt.Sprintf("%vs", currentOffset))
	timeOffset := fmt.Sprintf("%02d:00", int8(math.Abs(h.Hours())))
	if h.Hours() > 0 {
		timeOffset = "+" + timeOffset
	} else {
		timeOffset = "-" + timeOffset
	}
	return timeOffset
}

func (t *TimeUtils) GetDateTime(ct time.Time) string {
	return time.Time(ct).In(time.Now().Location()).Format("20060102150405")
}

func (t *TimeUtils) GetDate(ct time.Time) string {
	return time.Time(ct).In(time.Now().Location()).Format("20060102")
}

func (t *TimeUtils) GetLocation(time time.Time) *time.Location {
	return time.Location()
}

func (t *TimeUtils) CheckWorkingDate(dateString string) (string, bool) {
	date, _ := time.Parse("20060102", dateString)
	isWorkingDay := true
	if date.Weekday() == 0 || date.Weekday() == 6 {
		isWorkingDay = false
	}
	return date.Format("20060102"), isWorkingDay
}
