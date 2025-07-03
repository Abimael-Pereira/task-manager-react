import InputLabel from './InputLabel';

const TimeSelect = (props) => {
  return (
    <div className="flex flex-col text-left">
      <InputLabel htmlFor="time" label="Horário" />

      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 text-sm text-[#35383E] outline-[#00ADB5]"
        {...props}
      >
        <option value="" disabled selected>
          Selecione
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.errorMessage && (
        <span className="text-xs text-red-400">{props.errorMessage}</span>
      )}
    </div>
  );
};

export default TimeSelect;
