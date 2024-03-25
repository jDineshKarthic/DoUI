import React, { useState } from 'react';
import Layout from '../../Layout';
import { memberData, sortsDatas } from '../../components/Datas';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronDown, BiPlus, BiTime } from 'react-icons/bi';
import { BsCalendarMonth } from 'react-icons/bs';
import { MdFilterList, MdOutlineCalendarMonth } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { Button, FromToDate, Select } from '../../components/Form';
import { PatientTable } from '../../components/Tables';

function Patients() {
  const [status, setStatus] = useState(sortsDatas.filterPatient[0]);
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const navigate = useNavigate();

  const sorts = [
    {
      id: 2,
      selected: status,
      setSelected: setStatus,
      datas: sortsDatas.filterPatient,
    },
    {
      id: 3,
      selected: gender,
      setSelected: setGender,
      datas: sortsDatas.genderFilter,
    },
  ];
  // boxes
  const boxes = [
    {
      id: 1,
      title: 'Today Patients',
      value: '27',
      color: ['bg-subMain', 'text-subMain'],
      icon: BiTime,
    },
    {
      id: 2,
      title: 'Monthly Patients',
      value: '2525',
      color: ['bg-orange-500', 'text-orange-500'],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: 'Yearly Patients',
      value: '6800',
      color: ['bg-green-500', 'text-green-500'],
      icon: MdOutlineCalendarMonth,
    },
  ];

  // preview
  const previewPayment = (id) => {
    navigate(`/patients/preview/${id}`);
  };

  return (
    <Layout>
      {/* add button */}
      <Link
        to="/patients/create"
        className="fixed z-50 w-16 h-16 text-white border rounded-full animate-bounce border-border bg-subMain flex-colo bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </Link>
      <h1 className="text-xl font-semibold">Patients</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="my-6 text-xl font-medium">{box.value}</h2>
              <p className="text-xs text-textGray">
                Total Patients <span className={box.color[1]}>{box.value}</span>{' '}
                {box.title === 'Today Patients'
                  ? 'today'
                  : box.title === 'Monthly Patients'
                  ? 'this month'
                  : 'this year'}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
            >
              <box.icon />
            </div>
          </div>
        ))}
      </div>
      {/* datas */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 xs:grid-cols-2 md:grid-cols-3">
          <input
            type="text"
            placeholder='Search "Patients"'
            className="px-4 text-sm border rounded-md h-14 text-main bg-dry border-border"
          />
          {/* sort  */}
          {sorts.map((item) => (
            <Select
              key={item.id}
              selectedPerson={item.selected}
              setSelectedPerson={item.setSelected}
              datas={item.datas}
            >
              <div className="flex items-center justify-between w-full px-4 text-xs border rounded-md h-14 text-main bg-dry border-border">
                <p>{item.selected.name}</p>
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
          ))}
          {/* date */}
          <FromToDate
            startDate={startDate}
            endDate={endDate}
            bg="bg-dry"
            onChange={(update) => setDateRange(update)}
          />
          {/* export */}
          <Button
            label="Filter"
            Icon={MdFilterList}
            onClick={() => {
              toast.error('Filter data is not available yet');
            }}
          />
        </div>
        <div className="w-full mt-8 overflow-x-scroll">
          <PatientTable
            data={memberData}
            functions={{
              preview: previewPayment,
            }}
            used={false}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Patients;
