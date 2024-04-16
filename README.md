attributes to adjust settings:

- popup-rest-time="hours, minutes, seconds" , e.g.: popup-rest-time="23, 1, 15" - twenty three hours, one minute, fifteen seconds.
this attribtue is used to set the time, that a cookie will exist and continue blocking the function.
if not set, equals to 0

- popup-day="day in english short" , e.g.: popup-day="thu" - thursday.
blocks the function unless today matches the choosen day.
if not set, equals to any

- popup-period-min="year, month, day, hour:minutes:seconds" , e.g.: popup-period-min="2023, 12, 20" - 20th of Dec 2023.
sets the day when function will begin to work.
if not set, equals to now

- popup-period-max="year, month, day, hour:minutes:seconds" , e.g: popup-period-max="2023, 12, 21, 15:30" - 20th of Dec 2023 3:30 pm.
sets the time, when function will stop working for the given popup.
if not set, equals to thousand years.

- popup-period="(start hour:minute)-(end hour:minute)" , e.g. popup-period="12:00-14:00" - only from 12:00 to 14:00 will the popup be shown even if all the rest of conditions satisfied

E.g.: popup with the following set of atributes 

'''popup-rest-time="3, 0, 0" popup-day="thu" popup-period-min="2024, 1, 1, 00:00" popup-period-max="2024, 2, 1, 00:00" popup-period="12:00-18:00"'''

will be shown in january 2024 every thursday from 12:00 till 18:00 not more than once in three hours.