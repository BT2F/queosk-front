import { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import { ko } from 'date-fns/esm/locale';
import axios from '@/lib/axios';
import { format } from 'date-fns';

import { useQuery } from '@tanstack/react-query';

interface MenuType {
  menu: string;
  count: number;
  price: number;
}
interface TodayDataType {
  orderdMenu: MenuType[];
  price: number;
}

export default function SettlementView() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [todayData, setTodayData] = useState<TodayDataType | null>(null);
  //const [periodData, setPeriodData] = useState<TodayDataType | null>(null);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: '/api/restaurants/settlement/today',
        });
        console.log(res.data);
        if (res.status === 200) {
          setTodayData(res.data);
        }
      } catch (error) {
        console.log(error);
        // if (axios.isAxiosError(error)) {
        //   console.log(error);
        // }
      }
    };

    fetchTodayData();
  }, [startDate]);

  // const { data: todayData } = useQuery<TodayDataType>({
  //   queryKey: ['todaddd'],
  //   queryFn: async () => await axios.get('/api/restaurants/settlement/today'),
  // });

  // useEffect(() => {
  //   const startDateString = startDate.toISOString().split('T')[0];
  //   const endDateString = endDate.toISOString().split('T')[0];
  //   axios
  //     .all([
  //       axios.get('/api/restaurants/settlement/today'),
  //       axios.get(
  //         `/api/restaurants/settlement/period?to=${endDateString}&from=${startDateString}`
  //       ),
  //     ])
  //     .then(
  //       axios.spread((res1, res2) => {
  //         console.log(res1, res2);
  //       })
  //     )
  //     .catch((err) => console.log(err));
  // });

  // const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  // const formattedEndDate = format(endDate, 'yyyy-MM-dd');

  return (
    <div className="w-4/5 mx-auto">
      <div className="font-bold text-xl my-8">정산내역</div>
      <div className="flex items-center mb-5">
        <div className="font-semibold text-base my-4 mr-5">기간조회</div>
        <ReactDatePicker
          //locale={ko}
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
      </div>

      <div className="font-bold text-xl pt-8 mb-8">
        목록 (총
        {todayData ? todayData.orderdMenu.length : 0}
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

      {todayData && todayData.orderdMenu ? (
        todayData.orderdMenu.map((data, index) => (
          <div
            key={index + 1}
            className="flex h-[40px] flex items-center text-center"
          >
            <div className="w-1/6">{index + 1}</div>
            <div className="w-3/6">{data.menu}</div>
            <div className="w-2/6">{data.price} 원</div>
            <div className="w-2/6">x {data.count}</div>
            <div></div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
