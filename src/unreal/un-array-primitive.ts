import BufferValue from "../buffer-value";

type PrimitiveArrayTypes_T = C.NumberTypes_T | C.StringTypes_T;

class FArrayPrimitive<T extends PrimitiveArrayTypes_T> {
    protected readonly type: C.ValidTypes_T<T>;
    public value: ReturnType<T>;

    private constructor(dtype: C.ValidTypes_T<T>) {
        this.type = dtype;
    }

    public load(pkg: C.APackage): this {
        this.value = pkg.read(new BufferValue<PrimitiveArrayTypes_T>(this.type)).value as ReturnType<T>;

        return this;
    }

    public static forType<T extends PrimitiveArrayTypes_T>(dtype: C.ValidTypes_T<T>): new (...params: any) => FArrayPrimitive<T> {
        class FArrayPrimitiveExt extends FArrayPrimitive<T> {
            public static readonly serializedVariableSize = (
                dtype.name === "compat32"
                || dtype.name === "char"
                || dtype.name === "utf16"
                || !Number.isFinite(dtype.bytes)
            );

            constructor() { super(dtype); }
        }

        return FArrayPrimitiveExt;
    }
}

export default FArrayPrimitive;
export { FArrayPrimitive };

type ReturnType<T extends PrimitiveArrayTypes_T> =
    | T extends C.PrimitiveNumberTypes_T | "compat32" ? number
    : T extends C.BigNumberTypes_T ? bigint
    : T extends C.StringTypes_T ? string
    : never;