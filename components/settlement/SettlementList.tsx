import { settlementDataType } from '../views/settlement/SettlementView';

interface Props {
  today: settlementDataType;
  period: settlementDataType;
}

export default function SettlementList({ today, period }: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="font-bold text-lg mb-5">
        목록 ({today && today.orderedMenus.length}
        {period && period.orderedMenus.length}
        개)
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>번호</th>
            <th>메뉴명</th>
            <th>가격</th>
            <th>판매수량</th>
          </tr>
        </thead>
        <tbody>
          {period?.orderedMenus.length > 0 || today?.orderedMenus.length > 0 ? (
            <>
              {period &&
                period.orderedMenus &&
                period.orderedMenus.map((data, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{data.menu}</td>
                    <td>{data.menuPrice.toLocaleString()}원</td>
                    <td>{data.count}</td>
                  </tr>
                ))}

              {today &&
                today.orderedMenus &&
                today.orderedMenus.map((data, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{data.menu}</td>
                    <td>{data.menuPrice.toLocaleString()}원</td>
                    <td>{data.count}</td>
                  </tr>
                ))}
            </>
          ) : (
            <tr>
              <td colSpan={4}>정산 내역이 없습니다..</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-end mt-5 font-semibold text-lg">
        <div className="mr-5">총 금액 : </div>

        <div>{today && `${today.total.toLocaleString()}원`}</div>
        <div>{period && `${period.total.toLocaleString()}원`}</div>
      </div>
    </div>
  );
}
