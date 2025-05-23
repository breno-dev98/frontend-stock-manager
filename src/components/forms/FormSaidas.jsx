// src/components/FormSaidas.jsx
import { Controller } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext"; // necessário para o destino

const FormSaidas = ({ control, errors, produtos, unidades, unidade, modalVisible }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-y-6 gap-x-3 sm:gap-x-2 sm:gap-6">
      {/* Produto */}
      <div className="col-span-4 sm:col-span-full">
        <Controller
          name="produto_id"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <Dropdown
                {...field}
                options={produtos}
                optionLabel="nome"
                optionValue="id"
                autoFocus={modalVisible}
                id="produto_id"
                className={`w-full border rounded ${errors.produto_id ? "border-red-500" : ""}`}
              />
              <label htmlFor="produto_id">Produto</label>
            </FloatLabel>
          )}
        />
        {errors.produto_id && <span className="text-red-500">{errors.produto_id.message}</span>}
      </div>

      {/* Quantidade */}
      <div className="col-span-2 sm:col-span-3">
        <Controller
          name="quantidade"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputNumber
                {...field}
                id="quantidade"
                mode="decimal"
                useGrouping={false}
                minFractionDigits={unidade === "KG" ? 3 : 0}
                maxFractionDigits={unidade === "KG" ? 3 : 0}
                className={`w-full rounded ${errors.quantidade ? "border-red-500" : ""}`}
                invalid={!!errors.quantidade}
              />
              <label htmlFor="quantidade">Quantidade</label>
            </FloatLabel>
          )}
        />
        {errors.quantidade && <span className="text-red-500">{errors.quantidade.message}</span>}
      </div>

      {/* Unidade de Medida */}
      <div className="col-span-2 sm:col-span-3">
        <Controller
          name="unidade_medida"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <Dropdown
                {...field}
                options={unidades}
                optionLabel="nome"
                optionValue="value"
                id="unidade_medida"
                className={`w-full border rounded ${errors.unidade_medida ? "border-red-500" : ""}`}
              />
              <label htmlFor="unidade_medida">Unidade de Medida</label>
            </FloatLabel>
          )}
        />
        {errors.unidade_medida && <span className="text-red-500">{errors.unidade_medida.message}</span>}
      </div>

      {/* Data da saída */}
      <div className="col-span-2 sm:col-span-3">
        <Controller
          name="data_saida"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <Calendar
                {...field}
                id="data_saida"
                showIcon
                dateFormat="dd/mm/yy"
                className={`w-full rounded ${errors.data_saida ? "border-red-500" : ""}`}
                placeholder="Selecione a data"
              />
              <label htmlFor="data_saida">Data da Saída</label>
            </FloatLabel>
          )}
        />
        {errors.data_saida && <span className="text-red-500">{errors.data_saida.message}</span>}
      </div>

      {/* Destino */}
      <div className="col-span-2 sm:col-span-3">
        <Controller
          name="destino"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputText {...field} id="destino" className={`w-full border rounded ${errors.destino ? "border-red-500" : ""}`} />
              <label htmlFor="destino">Destino</label>
            </FloatLabel>
          )}
        />
        {errors.destino && <span className="text-red-500">{errors.destino.message}</span>}
      </div>

      {/* Observação */}
      <div className="col-span-full">
        <Controller
          name="observacao"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputTextarea
                {...field}
                id="observacao"
                rows={3}
                className={`w-full border rounded px-2 py-1 ${errors.observacao ? "border-red-500" : ""}`}
              />
              <label htmlFor="observacao">Observação (Opcional)</label>
            </FloatLabel>
          )}
        />
        {errors.observacao && <span className="text-red-500">{errors.observacao.message}</span>}
      </div>
    </div>
  );
};

export default FormSaidas;
