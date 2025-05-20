// src/components/FormProdutos.jsx
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

const FormProduto = ({ control, errors, categorias, marcas, fornecedores, unidades, unidade, modalVisible, Markup, handleGenerateEAN }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-y-6 gap-x-3 sm:gap-x-2 sm:gap-6">
      {/* Nome */}
      <div className="col-span-4 sm:col-span-3">
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputText
                {...field}
                type="text"
                id="nome"
                autoFocus={modalVisible}
                className="w-full border rounded px-2 py-1"
                invalid={!!errors.nome}
              />
              <label htmlFor="nome">Nome</label>
            </FloatLabel>
          )}
        />
        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
      </div>

      {/* Categoria */}
      <div className="col-span-2 sm:col-span-3">
        <Controller
          name="categoria_id"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <Dropdown
                {...field}
                options={categorias}
                optionLabel="nome"
                optionValue="id"
                id="categoria_id"
                className={`w-full border rounded ${errors.categoria_id ? "border-red-500" : ""}`}
              />
              <label htmlFor="categoria_id">Categoria (Opcional)</label>
            </FloatLabel>
          )}
        />
        {errors.categoria_id && <span className="text-red-500">{errors.categoria_id.message}</span>}
      </div>

      {/* Marca */}
      <div className="col-span-2 sm:col-span-3">
        <Controller
          name="marca_id"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <Dropdown
                {...field}
                options={marcas}
                optionLabel="nome"
                optionValue="id"
                id="marca_id"
                className={`w-full border rounded ${errors.marca_id ? "border-red-500" : ""}`}
              />
              <label htmlFor="marca_id">Marca</label>
            </FloatLabel>
          )}
        />
        {errors.marca_id && <span className="text-red-500">{errors.marca_id.message}</span>}
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
                id="unidade_de_medida"
                className={`w-full border rounded ${errors.unidade_medida ? "border-red-500" : ""}`}
              />
              <label htmlFor="unidade_de_medida">Unidade de Medida</label>
            </FloatLabel>
          )}
        />
        {errors.unidade_medida && <span className="text-red-500">{errors.unidade_medida.message}</span>}
      </div>

      {/* Fornecedor */}
      <div className="col-span-2 sm:col-span-3">
        <Controller
          name="fornecedor_id"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <Dropdown
                {...field}
                options={fornecedores}
                optionLabel="nome"
                optionValue="id"
                id="fornecedor_id"
                className={`w-full border rounded ${errors.fornecedor_id ? "border-red-500" : ""}`}
              />
              <label htmlFor="fornecedor_id">Fornecedor (Opcional)</label>
            </FloatLabel>
          )}
        />
        {errors.fornecedor_id && <span className="text-red-500">{errors.fornecedor_id.message}</span>}
      </div>

      {/* EAN + Botão */}
      <div className="flex gap-2 items-center col-span-full sm:col-span-3">
        <Controller
          name="ean"
          control={control}
          render={({ field }) => (
            <>
              <FloatLabel className="flex-1">
                <InputNumber
                  id="ean"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  inputRef={field.ref}
                  useGrouping={false}
                  className="w-full rounded"
                  invalid={!!errors.ean}
                  maxLength={13}
                />
                <label htmlFor="ean">EAN</label>
              </FloatLabel>
              <Button
                className="w-full h-full"
                size="small"
                severity="secondary"
                type="button"
                icon={<i className="pi pi-barcode" style={{ fontSize: "1rem" }}></i>}
                title="Gerar EAN"
                onClick={handleGenerateEAN}
                style={{ padding: "8px 0px" }}
              />
            </>
          )}
        />
        {errors.ean && <span className="text-red-500">{errors.ean.message}</span>}
      </div>

      {/* Preço de Custo */}
      <div className="col-span-2">
        <FloatLabel>
          <Controller
            name="preco_custo"
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                locale="pt-br"
                mode="currency"
                currency="BRL"
                id="preco_custo"
                className="w-full rounded"
                invalid={!!errors.preco_custo}
              />
            )}
          />
          <label htmlFor="preco_custo">Preço de custo</label>
        </FloatLabel>
        {errors.preco_custo && <span className="text-red-500">{errors.preco_custo.message}</span>}
      </div>

      {/* Preço de Venda */}
      <div className="col-span-2">
        <Controller
          name="preco_venda"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputNumber
                value={field.value}
                id="preco_venda"
                onValueChange={(e) => field.onChange(e.value)}
                locale="pt-br"
                mode="currency"
                currency="BRL"
                className="w-full rounded"
                invalid={!!errors.preco_venda}
              />
              <label htmlFor="preco_venda">Preço de venda</label>
            </FloatLabel>
          )}
        />
        {errors.preco_venda && <span className="text-red-500">{errors.preco_venda.message}</span>}
      </div>
      {/* Margem de lucro */}
      <div className="text-lg font-medium col-span-2">
        Margem: <span className={`text-blue-600 ${Markup < 0 && "text-red-600"} ${Markup == 0 && "text-gray-400"} font-bold`}>{Markup}%</span>
      </div>

      {/* Quantidade */}
      <div className="col-span-2">
        <Controller
          name="quantidade"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputNumber
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                inputRef={field.ref}
                mode="decimal"
                useGrouping={false}
                minFractionDigits={unidade === "KG" ? 3 : 0}
                maxFractionDigits={unidade === "KG" ? 3 : 0}
                id="quantidade"
                className="w-full rounded"
                invalid={!!errors.quantidade}
              />
              <label htmlFor="quantidade">Estoque Atual</label>
            </FloatLabel>
          )}
        />
        {errors.quantidade && <span className="text-red-500">{errors.quantidade.message}</span>}
      </div>

      {/* Estoque mínimo */}
      <div className="col-span-2">
        <Controller
          name="estoque_minimo"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputNumber
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                inputRef={field.ref}
                mode="decimal"
                useGrouping={false}
                minFractionDigits={unidade === "KG" ? 3 : 0}
                maxFractionDigits={unidade === "KG" ? 3 : 0}
                id="estoque_minimo"
                className="w-full rounded"
                invalid={!!errors.estoque_minimo}
              />
              <label htmlFor="estoque_minimo">Estoque Mínimo</label>
            </FloatLabel>
          )}
        />
        {errors.estoque_minimo && <span className="text-red-500">{errors.estoque_minimo.message}</span>}
      </div>

      {/* Estoque máximo */}
      <div className="col-span-2">
        <Controller
          name="estoque_maximo"
          control={control}
          render={({ field }) => (
            <FloatLabel>
              <InputNumber
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                inputRef={field.ref}
                mode="decimal"
                useGrouping={false}
                minFractionDigits={unidade === "KG" ? 3 : 0}
                maxFractionDigits={unidade === "KG" ? 3 : 0}
                id="estoque_maximo"
                className="w-full rounded"
                invalid={!!errors.estoque_maximo}
              />
              <label htmlFor="estoque_maximo">Estoque Máximo</label>
            </FloatLabel>
          )}
        />
        {errors.estoque_maximo && <span className="text-red-500">{errors.estoque_maximo.message}</span>}
      </div>

      {/* Descrição */}
      <div className="col-span-full">
        <FloatLabel>
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <InputTextarea {...field} type="text" id="descricao" className="w-full border rounded px-2 py-1" invalid={!!errors.descricao} />
            )}
          />
          <label htmlFor="descricao">Descrição (Opcional)</label>
        </FloatLabel>
        {errors.descricao && <span className="text-red-500">{errors.descricao.message}</span>}
      </div>
    </div>
  );
};

export default FormProduto;
