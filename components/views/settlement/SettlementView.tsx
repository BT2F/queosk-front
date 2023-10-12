import { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '@/lib/axios';
import { format } from 'date-fns';
import Nav from '@/components/common/mystore/Nav';
import Header from '@/components/common/Header';
import SettlementList from '@/components/settlement/SettlementList';

interface MenuType {
  menu: string;
  count: number;
  menuPrice: number;
}
export interface settlementDataType {
  orderedMenus: MenuType[];
  total: number;
}

export default function SettlementView() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [todayData, setTodayData] = useState<settlementDataType | null>(null);
  const [periodData, setPeriodData] = useState<settlementDataType | null>(null);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getTodaySettle = async () => {
    try {
      const response = await axios.get('/api/restaurants/settlement/today');
      const data = response.data;
      setTodayData(data);
      setPeriodData(null);
    } catch (error) {
      console.error('금일 정산 조회', error);
    }
  };

  const getPeriodSettle = async () => {
    try {
      const startDateString = format(startDate, 'yyyy-MM-dd');
      const endDateString = format(endDate, 'yyyy-MM-dd');
      const response = await axios.get(
        `/api/restaurants/settlement/period?to=${endDateString}&from=${startDateString}`
      );
      const data = response.data;
      setPeriodData(data);
      setTodayData(null);
    } catch (error) {
      console.error('기간별 정산 조회', error);
    }
  };

  useEffect(() => {
    getTodaySettle();
    getPeriodSettle();
    if (startDate && endDate) {
      const isToday = new Date();
      if (startDate.toDateString() === endDate.toDateString()) {
        if (startDate.toDateString() === isToday.toDateString()) {
          getTodaySettle();
          setPeriodData(null);
        } else {
          getPeriodSettle();

          setTodayData(null);
        }
      } else {
        getPeriodSettle();

        setTodayData(null);
      }
    }
  }, [startDate, endDate]);

  return (
    <div className="flex">
      <Nav />

      <div className="w-full">
        <Header title="정산내역" isBack={false} />

        <div className="w-6/7 h-full flex mt-10 mx-10">
          <div className="w-1/3 flex flex-col items-start justify-between">
            <div className="flex items-center mb-5">
              <div className="font-semibold text-base my-4 mr-5">기간조회</div>
              <ReactDatePicker
                shouldCloseOnSelect
                dateFormat="yyyy.MM.dd"
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()}
                selectsRange
                className="input input-bordered input-warning w-full max-w-xs"
              />
              <style>
                {`
           .react-datepicker__day--selected, .react-datepicker__day--in-range{
            background-color: #FBBD23;
          }
          .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover,
          .react-datepicker__day--in-range:hover, .react-datepicker__month-text--selected:hover,
          .react-datepicker__month-text--in-selecting-range:hover, .react-datepicker__month-text--in-range:hover,
          .react-datepicker__quarter-text--selected:hover, .react-datepicker__quarter-text--in-selecting-range:hover,
          .react-datepicker__quarter-text--in-range:hover, .react-datepicker__year-text--selected:hover,
          .react-datepicker__year-text--in-selecting-range:hover, .react-datepicker__year-text--in-range:hover{
            background-color: #FBBD23;
          }
          .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range,
          .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range,
          .react-datepicker__year-text--in-range), .react-datepicker__month-text--in-selecting-range:not(.react-datepicker__day--in-range,
          .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range,
          .react-datepicker__year-text--in-range), .react-datepicker__quarter-text--in-selecting-range:not(.react-datepicker__day--in-range,
          .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range,
          .react-datepicker__year-text--in-range), .react-datepicker__year-text--in-selecting-range:not(.react-datepicker__day--in-range,
          .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range,
          .react-datepicker__year-text--in-range) {
              background-color: #FBBD23;
            }
          `}
              </style>
            </div>
          </div>
          <div className="w-2/3 h-full">
            <SettlementList
              today={todayData as settlementDataType}
              period={periodData as settlementDataType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
