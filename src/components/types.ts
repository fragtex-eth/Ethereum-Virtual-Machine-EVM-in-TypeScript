// types.ts
import { Dispatch, SetStateAction } from "react";

export interface TxState {
  from: string;
  to: string;
  origin: string;
  gasprice: string;
  value: string;
  data: string;
}

export interface BlockState {
  basefee: string;
  coinbase: string;
  timestamp: string;
  number: string;
  difficulty: string;
  gaslimit: string;
  chainid: string;
}

export interface Code {
  bin: string;
}

export interface AddressData {
  balance: string;
  code: Code;
}

export interface MainProps {
  setOutput: (output: any) => void;
  tx: TxState;
  setTxVis: (output: any) => void;
  setBlockVis: (output: any) => void;
  setAddressesVis: (output: any) => void;
  block: BlockState;
  addresses: { [key: string]: AddressData };
}
export interface BlockState {
  basefee: string;
  coinbase: string;
  timestamp: string;
  number: string;
  difficulty: string;
  gaslimit: string;
  chainid: string;
}

export interface TransactionProps {
  block: BlockState;
  setBlock: Dispatch<SetStateAction<BlockState>>;
  setBlockVis: Dispatch<SetStateAction<boolean>>;
}
export interface TransactionPropsState {
  tx: TxState;
  setTx: Dispatch<SetStateAction<TxState>>;
  setTxVis: Dispatch<SetStateAction<boolean>>;
}

export interface Opcode {
  uint8: string;
  mnemonic: string;
  description: string;
}

export interface AddressData {
  balance: string;
  code: {
    bin: string;
  };
}

export interface InputData {
  address: string;
  code: string;
  balance: string;
}

export interface StateProps {
  addresses: { [key: string]: AddressData };
  setAddresses: Dispatch<SetStateAction<{ [key: string]: AddressData }>>;
  setAddressesVis: Dispatch<SetStateAction<boolean>>;
}

export interface InputFieldProps {
  label: string;
  field: keyof TxState;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof TxState
  ) => void;
}
