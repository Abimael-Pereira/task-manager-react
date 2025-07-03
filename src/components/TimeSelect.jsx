import InputLabel from './InputLabel';

const TimeSelect = () => {
  return (
    <div className="flex flex-col text-left">
      <InputLabel htmlFor="time" label="Horário" />

      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 text-sm text-[#35383E] outline-[#00ADB5]"
      >
        <option value="" disabled selected>
          Selecione
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  );
};

export default TimeSelect;
