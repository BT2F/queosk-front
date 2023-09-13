import { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '@/lib/axios';
import { format } from 'date-fns';

interface MenuType {
  menu: string;
  count: number;
  price: number;
}
interface DataType {
  orderedMenus: MenuType[];
  price: number;
}

export default function SettlementView() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [todayData, setTodayData] = useState<DataType | null>(null);
  const [periodData, setPeriodData] = useState<DataType | null>(null);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  //금일 정산 조회
  const getTodaySettle = async () => {
    try {
      const response = await axios.get('/api/restaurants/settlement/today');
      const data = response.data;
      console.log(data);
      setTodayData(data);
      setPeriodData(null);
    } catch (error) {
      console.error('금일 정산 조회', error);
    }
  };
  useEffect(() => {
    getTodaySettle();
  }, []);

  //기간별 정산 조회
  const getPeriodSettle = async () => {
    try {
      const startDateString = format(startDate, 'yyyy-MM-dd');
      const endDateString = format(endDate, 'yyyy-MM-dd');
      console.log(startDateString);
      console.log(endDateString);
      const response = await axios.get(
        `/api/restaurants/settlement/period?to=${endDateString}&from=${startDateString}`
      );
      const data = response.data;

      console.log(data);
      setPeriodData(data);
      setTodayData(null);
    } catch (error) {
      console.error('기간별 정산 조회', error);
    }
  };
  useEffect(() => {
    getPeriodSettle();
  }, []);

  useEffect(() => {
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
    <div className="w-4/5 mx-auto">
      <div className="font-bold text-xl my-8">정산내역</div>
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
      <div className="flex items-center mb-5">
        <div className="font-semibold text-base mr-5">총 금액 : </div>

        <div>{todayData && `${todayData.price} 원`}</div>
        <div>{periodData && `${periodData.price} 원`}</div>
      </div>

      <div className="font-bold text-xl pt-8 mb-8">
        목록 ({todayData && todayData.orderedMenus.length}
        {periodData && periodData.orderedMenus.length}
        개)
      </div>
      <div>
        <div className="flex h-[40px] flex items-center text-center border-y-[2px] border-zinc-300 font-bold">
          <div className="w-1/6">No.</div>
          <div className="w-3/6">메뉴명</div>
          <div className="w-2/6">가격</div>
          <div className="w-2/6">판매수량</div>
        </div>
      </div>

      {periodData?.orderedMenus || todayData?.orderedMenus ? (
        <div className="flex flex-col w-full h-[40px] flex items-center text-center">
          {periodData &&
            periodData.orderedMenus &&
            periodData.orderedMenus.map((data, index) => (
              <div
                key={index + 1}
                className="flex w-full h-[40px] flex items-center text-center py-3"
              >
                <div className="w-1/6">{index + 1}</div>
                <div className="w-3/6">{data.menu}</div>
                <div className="w-2/6">{data.price} 원</div>
                <div className="w-2/6">x {data.count}</div>
                <div></div>
              </div>
            ))}

          {todayData &&
            todayData.orderedMenus &&
            todayData.orderedMenus.map((data, index) => (
              <div
                key={index + 1}
                className="lex w-full h-[40px] flex items-center text-center py-3"
              >
                <div className="w-1/6">{index + 1}</div>
                <div className="w-3/6">{data.menu}</div>
                <div className="w-2/6">{data.price} 원</div>
                <div className="w-2/6">x {data.count}</div>
                <div></div>
              </div>
            ))}
        </div>
      ) : (
        <div>정산 내역이 없습니다..</div>
      )}
    </div>
  );
}
