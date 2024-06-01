import React from "react";
import "./Filter.css";

const Filter = ({ minPrice, setFilterPriceMin, maxPrice, setFilterPriceMax, oper, setOper, CPU, setCpu, GPU, setGpu, powerSupply, setPowerSupply, mother, setMother, handler }) => {
    return (
        <div className="productDetail">
            <div>
                <label>
                    Min Price:
                    <input
                        type="range"
                        value={minPrice}
                        onChange={(event) => { setFilterPriceMin(event.target.value) }}
                        className="form-control"
                        min={0}
                        max={10000}
                    />
                </label>
            </div>
            <div>
                <label>
                    Max Price:
                    <input
                        type="range"
                        value={maxPrice}
                        onChange={(event) => { setFilterPriceMax(event.target.value) }}
                        className="form-control"
                        min={0}
                        max={10000}
                    />
                </label>
            </div>
            <div>
                <label>
                    CPU:
                    <input
                        type="text"
                        value={CPU}
                        onChange={(event) => { setCpu(event.target.value) }}
                        className="form-control"
                    />
                </label>
            </div>
            <div>
                <label>
                    GPU:
                    <input
                        type="text"
                        value={GPU}
                        onChange={(event) => { setGpu(event.target.value) }}
                        className="form-control"
                    />
                </label>
            </div>
            <div>
                <label>
                    Блок питания:
                    <input
                        type="value"
                        value={powerSupply}
                        onChange={(event) => { setPowerSupply(event.target.value) }}
                        className="form-control"

                    />
                </label>
            </div>
            <div>
                <label>
                    Материнская плата:
                    <input
                        type="text"
                        value={mother}
                        onChange={(event) => { setMother(event.target.value) }}
                        className="form-control"
                    />
                </label>
            </div>
            <div>
                <label>
                    Оперативная память:
                    <input
                        type="value"
                        value={oper}
                        onChange={(event) => { setOper(event.target.value) }}
                        className="form-control"
                    />
                </label>
            </div>
            <button onClick={handler}>Применить</button>
        </div>
    );
};

export default Filter;
