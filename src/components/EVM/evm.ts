import { Buffer } from "buffer";
/**
 * EVM From Scratch
 * TypeScript template
 *
 * To work on EVM From Scratch in TypeScript:
 *
 * - Install Node.js: https://nodejs.org/en/download/
 * - Go to the `typescript` directory: `cd typescript`
 * - Install dependencies: `yarn` (or `npm install`)
 * - Edit `evm.ts` (this file!), see TODO below
 * - Run `yarn test` (or `npm test`) to run the tests
 * - Use Jest Watch Mode to run tests when files change: `yarn test --watchAll`
 */
//const { createHash } = require("crypto-browserify");

type Result = {
  success: boolean;
  stack: any[];
  return: any;
} | undefined;

export default function evm(
  code: Uint8Array,
  transactionData: any,
  blockData: any,
  stateData: any
): Result {
    try {
      let pc = 0;
      let returnValue = 0;
      let stack: any[] = [];

      let memory = Buffer.alloc(1024);
      let evmStorage: any = {};

      let success = true;
      console.log(code);
      while (pc < code.length) {
        const opcode = code[pc];
        console.log("now1 =" + pc);
        pc++;

        let mem:any;
        let valueToShift;
        let shiftAmount;
        let result = 0;
        if (opcode == 0x00) break;

        switch (opcode) {
          case 0x01:
            mem = overflow(stack[0] + stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x02:
            mem = overflow(stack[0] * stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x03:
            mem = overflow(stack[0] - stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x04:
            //Allows Division by zero
            if (BigInt(stack[1].toString()) !== BigInt(0)) {
              mem = overflow(stack[0] / stack[1]);
            } else {
              mem = BigInt(0);
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x05:
            if (stack[1].toString() === "0" || stack[0].toString() === "0") {
              mem = BigInt(0);
            } else {
              let decimalValue = twoComplementF(stack[0]);
              let decimalValue2 = twoComplementF(stack[1]);
              mem = overflow(decimalValue / decimalValue2);
            }

            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x06:
            //Allows Division by zero
            if (BigInt(stack[1].toString()) !== BigInt(0)) {
              mem = overflow(stack[0] % stack[1]);
            } else {
              mem = BigInt(0);
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x07:
            if (stack[1].toString() === "0" || stack[0].toString() === "0") {
              mem = BigInt(0);
            } else {
              let decimalValue = twoComplementF(stack[0]);
              let decimalValue2 = twoComplementF(stack[1]);
              mem = overflow(decimalValue % decimalValue2);

              // Check if MSB is 1
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x08:
            mem = overflow(stack[0] + stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            if (BigInt(stack[1].toString()) !== BigInt(0)) {
              mem = overflow(stack[0] % stack[1]);
            } else {
              mem = BigInt(0);
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x09: // MULMOD
            let modulus = stack.pop();
            let b = stack.pop();
            let a = stack.pop();
            if (modulus === BigInt(0)) {
              stack.push(BigInt(0));
            } else {
              let result = (a * b) % modulus;
              stack.push(result);
            }
            break;
          case 0x0a:
            mem = overflow(stack[0] ** stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x0b:
            //if number >= 128 add fff
            if (stack[1] >= 128 && stack[0] === BigInt(0)) {
              mem = "0x";
              while (mem.length - stack[1].toString(16).length < 62) {
                mem += "F";
              }
              mem += stack[1].toString(16);
              console.log(mem.length);
            } else {
              mem = "0x" + stack[1].toString(16);
            }
            stack.shift();
            stack.shift();
            stack.unshift(BigInt(mem));
            pc++;
            break;
          case 0x10:
            if (BigInt(stack[0]) < BigInt(stack[1])) {
              mem = BigInt(1);
            } else {
              mem = BigInt(0);
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x11:
            if (BigInt(stack[0]) > BigInt(stack[1])) {
              mem = BigInt(1);
            } else {
              mem = BigInt(0);
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x12:
            let maxValue = BigInt(
              "0x8000000000000000000000000000000000000000000000000000000000000000"
            );
            let decimalValue = twoComplementF(stack[0]);
            let decimalValue2 = twoComplementF(stack[1]);
            if (BigInt(stack[0]) > maxValue && BigInt(stack[1]) < maxValue) {
              mem = BigInt(1);
            } else if (
              BigInt(stack[0]) > maxValue &&
              BigInt(stack[1]) > maxValue
            ) {
              if (decimalValue > decimalValue2) {
                mem = BigInt(1);
              } else {
                mem = BigInt(0);
              }
            } else {
              if (decimalValue < decimalValue2) {
                mem = BigInt(1);
              } else {
                mem = BigInt(0);
              }
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x13:
            let maxValue1 = BigInt(
              "0x8000000000000000000000000000000000000000000000000000000000000000"
            );
            let decimalValue1 = twoComplementF(stack[0]);
            let decimalValue12 = twoComplementF(stack[1]);
            if (BigInt(stack[0]) > maxValue1 && BigInt(stack[1]) < maxValue1) {
              mem = BigInt(0);
            } else if (
              BigInt(stack[0]) > maxValue1 &&
              BigInt(stack[1]) > maxValue1
            ) {
              if (decimalValue1 > decimalValue12) {
                mem = BigInt(1);
              } else {
                mem = BigInt(0);
              }
            } else {
              if (decimalValue1 > decimalValue12) {
                mem = BigInt(1);
              } else {
                mem = BigInt(0);
              }
            }
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x14:
            mem = stack[0] === stack[1] ? BigInt(1) : BigInt(0);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x15:
            mem = BigInt(stack[0]) === BigInt(0) ? BigInt(1) : BigInt(0);
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x19:
            const mask = BigInt(
              "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
            );
            mem = ~BigInt(stack[0]) & mask;
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x16:
            mem = BigInt(stack[0]) & BigInt(stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x17:
            mem = BigInt(stack[0]) | BigInt(stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x18:
            mem = BigInt(stack[0]) ^ BigInt(stack[1]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x1a:
            //@note not working
            let word = stack.pop();
            let byteIndex = Number(stack.pop());

            if (byteIndex < 32) {
              let shiftAmount = (31 - byteIndex) * 8;
              //mem = (word >> BigInt(shiftAmount)) & 0xffn;
            } else {
              mem = BigInt(0);
            }

            stack.push(mem);
            break;
          case 0x1b:
            //Test case doesn't work?
            valueToShift = stack.pop();
            shiftAmount = Number(stack.pop());

            if (shiftAmount >= 256) {
              mem = BigInt(0);
            } else {
              mem =
                (valueToShift * BigInt(2 ** shiftAmount)) &
                (BigInt(2 ** 256) - BigInt(1));
            }

            stack.push(mem);
            pc++;
            break;
          case 0x1c:
            mem = BigInt(stack[1] >> stack[0]);
            stack.shift();
            stack.shift();
            stack.unshift(mem);
            pc++;
            break;
          case 0x1d:
            valueToShift = stack.pop();
            shiftAmount = Number(stack.pop());

            if (shiftAmount >= 256) {
              if ((valueToShift & (BigInt(1) << BigInt(255))) == BigInt(0)) {
                mem = BigInt(0);
              } else {
                mem = BigInt(2 ** 256) - BigInt(1);
              }
            } else {
              let isNegative =
                (valueToShift & (BigInt(1) << BigInt(255))) !== BigInt(0);
              if (isNegative) {
                let mask =
                  ((BigInt(1) << BigInt(256)) - BigInt(1)) ^
                  ((BigInt(1) << BigInt(shiftAmount)) - BigInt(1));
                mem = (valueToShift >> BigInt(shiftAmount)) | mask;
              } else {
                mem = valueToShift >> BigInt(shiftAmount);
              }
            }
            stack.push(mem);
            pc++;
            break;
          case 0x20:
            //@todo does it work
            mem = Number(stack.pop());
            let offset1 = Number(stack.pop());
            let data = memory.slice(offset1, offset1 + mem);
            //let hash = createHash("sha3-256").update(data).digest();
            //let result = BigInt("0x" + hash.toString("hex"));
            stack.push(result);
            break;
          case 0x1a:
            //Not implemented yet
            stack.shift();
            stack.shift();
            pc++;
            break;
          case 0x30:
            stack.push(BigInt(transactionData.to));
            break;
          case 0x31:
            //Balance
            mem = "0x" + stack[0].toString(16).padStart(40, "0");
            stack.shift();
            mem =
              stateData && stateData.hasOwnProperty(mem)
                ? stateData[mem].balance
                : "0x0";
            stack.push(BigInt(mem));
            break;
          case 0x32:
            stack.push(BigInt(transactionData.origin));
            break;
          case 0x33:
            stack.push(BigInt(transactionData.from));
            break;
          case 0x34:
            stack.push(BigInt(transactionData.value));
            break;
          case 0x35:
            let transactionDataBigInt = transactionData.data;
            let offset = parseInt(stack[0], 10);
            let outputBytes = Buffer.alloc(32, 0);

            let transactionDataBytes = Buffer.from(
              transactionDataBigInt.toString(16).padStart(64, "0"),
              "hex"
            );

            for (let i = 0; i < 32; i++) {
              if (offset + i < transactionDataBytes.length) {
                outputBytes[i] = transactionDataBytes[offset + i];
              }
            }

            let output = BigInt("0x" + outputBytes.toString("hex"));
            console.log(output);
            stack.pop();
            stack.push(output);
            break;
          case 0x36:
            if (transactionData) {
              mem = transactionData.data;
              mem = Buffer.from(mem.toString(16).padStart(2, "0"), "hex");
              mem = mem.length;
            } else {
              mem = 0;
            }
            console.log(mem);
            stack.push(BigInt(mem));
            break;
          case 0x37:
            //@note doesn't work still missing
            let length = BigInt(stack.pop());
            let calldataOffset = BigInt(stack.pop());
            let memOffset = BigInt(stack.pop());
            let calldataBytes = Buffer.from(
              transactionData.data.slice(2),
              "hex"
            );
            for (let i = 0; i < length; i++) {
              let byte = calldataBytes[Number(calldataOffset) + i];
              //@ts-ignore
              memory[BigInt(memOffset) + BigInt(i)] = byte
                ? BigInt(byte)
                : BigInt(0);
            }
            pc--;
            break;
          case 0x38:
            stack.push(BigInt(code.length));
            break;
          case 0x39:
            let length1 = Number(stack.pop());
            let codeOffset = Number(stack.pop());
            let memOffset1 = Number(stack.pop());

            for (let i = 0; i < length1; i++) {
              memory[memOffset1 + i] = code[codeOffset + i];
            }
            break;

          case 0x3a:
            stack.push(BigInt(transactionData.gasprice));
            break;
          case 0x3b: {
            //@note not implemented yet
            // EXTCODESIZE
            console.log(stateData);
            const address = stack.pop().toString(16).padStart(40, "0");
            const contractCode = stateData["0x" + address]?.code || "";
            stack.push(BigInt(contractCode.length / 2));
            break;
          }
          case 0xf3:
            let size = Number(stack.pop());
            let byteOffset = Number(stack.pop());
            //@ts-ignore
            returnValue = Buffer.from(
              memory.slice(byteOffset, byteOffset + size)
            );
            break;
            pc = code.length;
          case 0xfd:
            success = false;
            pc = code.length; // Exit the loop
            break;
          case 0x41:
            stack.push(BigInt(blockData.coinbase));
            break;
          case 0x42:
            stack.push(BigInt(blockData.timestamp));
            break;
          case 0x43:
            stack.push(BigInt(blockData.number));
            break;
          case 0x44:
            stack.push(BigInt(blockData.difficulty));
            break;
          case 0x45:
            stack.push(BigInt(blockData.gaslimit));
            break;
          case 0x46:
            stack.push(BigInt(blockData.chainid));
            break;
          case 0x40: //@todo blockhash not implemented yet
            break;
          case 0x47:
            //@todo what happende here?
            // transactionData;
            // stateData;
            stack.push(BigInt(stateData[transactionData.to].balance));
            break;
          case 0x48:
            stack.push(BigInt(blockData.basefee));
            break;
          case 0x50:
            stack.shift();
            pc--;
            break;
          case 0x51:
            let mloadOffset = Number(stack.pop());
            let loadedValueMem = BigInt(
              "0x" + memory.slice(mloadOffset, mloadOffset + 32).toString("hex")
            );
            stack.push(loadedValueMem);
            pc--;
            break;
          case 0x52:
            let valueToStore = stack.pop();
            let mstoreOffset = Number(stack.pop());
            let valueToStoreBytes = Buffer.from(
              valueToStore.toString(16).padStart(64, "0"),
              "hex"
            );
            for (let i = 0; i < 32; i++) {
              memory[mstoreOffset + i] = valueToStoreBytes[i];
            }
            pc--;
            break;
          case 0x53: // MSTORE8
            let value3 = Number(stack.pop());
            let offset2 = Number(stack.pop());

            // Get the least significant byte of the value to store
            let byteToStore = value3 & 0xff;

            // Write the byte to memory
            memory.writeUInt8(byteToStore, offset2);
            pc--;
            break;
          case 0x54:
            let storageKeyToLoad = stack.pop();
            let loadedValue = evmStorage[storageKeyToLoad] || BigInt(0);
            stack.push(loadedValue);
            pc--;
            break;
          case 0x55:
            //SStore
            let storageValue1 = stack.pop();
            let storageKey1 = stack.pop();
            evmStorage[storageKey1] = storageValue1;
            pc--;
            break;
          case 0x56:
            //@note no jumpdest boundary
            // Pop the destination from the stack
            let destination = Number(stack.pop());

            // Verify that the destination is a valid instruction boundary
            if (destination % 1 !== 0) {
              // Invalid instruction boundary, clear the stack and return
              stack = [];
              return { success: false, stack, return: returnValue };
            }

            // Verify that the destination is a valid jump destination
            if (destination >= code.length || code[destination] !== 0x5b) {
              // Invalid jump destination, clear the stack and return
              stack = [];
              return { success: false, stack, return: returnValue };
            }

            // Update the program counter to jump to the destination
            pc = destination - 1;
            break;
          case 0x57:
            console.log("JUMPI: " + stack);
            if (stack[1] != 0) {
              console.log("init");
              //Todo: Jumpdest validity still missing
              pc = Number(stack[0]) - 1;
              //0x5B = 91 Jumpdest
              if (code[pc + 1] != 91) {
                stack = [];
                return { success: false, stack, return: returnValue };
              }
              pc++;
            }
            pc--;
            console.log(pc);
            stack.pop();
            stack.pop();
            console.log(stack);
            break;
          case 0x58:
            stack.unshift(BigInt(pc - 1));
            pc--;
            break;
          case 0x59:
            //@todo currently missing MSIZE
            stack.push(memory === null ? BigInt(0) : BigInt(memory.byteLength));
            break;
          case 0x5f:
            stack.push(BigInt(0));
            break;
          case 0x5a:
            //GAS Not implemented in this version
            stack = [
              BigInt(
                "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
              ),
            ];
            return { success: true, stack, return: returnValue };
          case 0x5b:
            console.log("Jumpdest");
            console.log(code + " pc: " + pc);
            pc--;
            break;
          case 0x60:
            stack.unshift(BigInt(code[pc]));
            break;
          case 0x61:
            mem = "0x" + code[pc].toString(16);
            pc++;
            mem += code[pc].toString(16);
            stack.unshift(BigInt(mem));
            break;
          case 0x63:
            mem = "0x" + code[pc].toString(16);
            for (let i = 0; i < 3; i++) {
              pc++;
              mem += code[pc].toString(16);
            }
            stack.unshift(BigInt(mem));
            break;
          case 0x65:
            mem = "0x" + code[pc].toString(16);
            for (let i = 0; i < 5; i++) {
              pc++;
              mem += code[pc].toString(16);
            }
            stack.unshift(BigInt(mem));
            break;
          case 0x69:
            mem = "0x" + code[pc].toString(16);
            for (let i = 0; i < 9; i++) {
              pc++;
              mem += code[pc].toString(16);
            }
            stack.unshift(BigInt(mem));
            break;
          case 0x6a:
            mem = "0x" + code[pc].toString(16);
            for (let i = 0; i < 10; i++) {
              pc++;
              mem += code[pc].toString(16);
            }
            stack.unshift(BigInt(mem));
            break;
          case 0x73:
            mem = "0x" + code[pc].toString(16).padStart(2, "0");
            for (let i = 0; i < 19; i++) {
              pc++;
              mem += code[pc].toString(16).padStart(2, "0");
            }
            console.log("7f: " + mem);
            stack.unshift(BigInt(mem));
            break;
          case 0x7f:
            mem = "0x" + code[pc].toString(16).padStart(2, "0");
            for (let i = 0; i < 31; i++) {
              pc++;
              mem += code[pc].toString(16).padStart(2, "0");
            }
            console.log("7f: " + mem);
            stack.unshift(BigInt(mem));
            break;
          case 0x80:
            stack.unshift(stack[0]);
            pc--;
            break;
          case 0x81:
            stack.unshift(stack[1]);
            pc--;
            break;
          case 0x82:
            stack.unshift(stack[2]);
            pc--;
            break;
          case 0x83:
            stack.unshift(stack[3]);
            pc--;
            break;
          case 0x84:
            stack.unshift(stack[4]);
            pc--;
            break;
          case 0x85:
            stack.unshift(stack[5]);
            pc--;
            break;
          case 0x86:
            stack.unshift(stack[6]);
            pc--;
            break;
          case 0x87:
            stack.unshift(stack[7]);
            pc--;
            break;
          case 0x88:
            stack.unshift(stack[8]);
            pc--;
            break;
          case 0x89:
            stack.unshift(stack[9]);
            pc--;
            break;
          case 0x8a:
            stack.unshift(stack[10]);
            pc--;
            break;
          case 0x8b:
            stack.unshift(stack[11]);
            pc--;
            break;
          case 0x8c:
            stack.unshift(stack[12]);
            pc--;
            break;
          case 0x8d:
            stack.unshift(stack[13]);
            pc--;
            break;
          case 0x8e:
            stack.unshift(stack[14]);
            pc--;
            break;
          case 0x8f:
            stack.unshift(stack[15]);
            pc--;
            break;
          case 0x90:
            mem = stack[0];
            stack[0] = stack[1];
            stack[1] = mem;
            pc--;
            break;
          case 0x91:
            mem = stack[0];
            stack[0] = stack[2];
            stack[2] = mem;
            pc--;
            break;
          case 0x92:
            mem = stack[0];
            stack[0] = stack[3];
            stack[3] = mem;
            pc--;
            break;
          case 0x93:
            mem = stack[0];
            stack[0] = stack[4];
            stack[4] = mem;
            pc--;
            break;
          case 0x94:
            mem = stack[0];
            stack[0] = stack[5];
            stack[5] = mem;
            pc--;
            break;
          case 0x95:
            mem = stack[0];
            stack[0] = stack[6];
            stack[6] = mem;
            pc--;
            break;
          case 0x96:
            mem = stack[0];
            stack[0] = stack[7];
            stack[7] = mem;
            pc--;
            break;
          case 0x97:
            mem = stack[0];
            stack[0] = stack[8];
            stack[8] = mem;
            pc--;
            break;
          case 0x98:
            mem = stack[0];
            stack[0] = stack[9];
            stack[9] = mem;
            pc--;
            break;
          case 0x99:
            mem = stack[0];
            stack[0] = stack[10];
            stack[10] = mem;
            pc--;
            break;
          case 0x9a:
            mem = stack[0];
            stack[0] = stack[11];
            stack[11] = mem;
            pc--;
            break;
          case 0x9b:
            mem = stack[0];
            stack[0] = stack[12];
            stack[12] = mem;
            pc--;
            break;
          case 0x9c:
            mem = stack[0];
            stack[0] = stack[13];
            stack[13] = mem;
            pc--;
            break;
          case 0x9d:
            mem = stack[0];
            stack[0] = stack[14];
            stack[14] = mem;
            pc--;
            break;
          case 0x9e:
            mem = stack[0];
            stack[0] = stack[15];
            stack[15] = mem;
            pc--;
            break;
          case 0x9f:
            mem = stack[0];
            stack[0] = stack[16];
            stack[16] = mem;
            pc--;
            break;
          case 0xa0:
            //@note not yet implemented
            const length2 = Number(stack.pop());
            const offset3 = Number(stack.pop());
            const logData = memory.slice(offset3, offset3 + length2);
            console.log("LOG0: ", logData.toString("hex"));
            break;
          case 0xf1:
            console.log(stack);
            console.log(stateData);
            mem = evm(
              stateData["0x" + stack[1].toString(16)].code.bin,
              null,
              null,
              null
            );
            stack.pop();
            stack.pop();
            stack.pop();
            stack.pop();
            stack.pop();
            stack.pop();
            stack.pop();
            stack.push(mem.return);
            break;
          default:
            stack = [];
            return { success: false, stack, return: returnValue };
        }
        pc++;
      }

      return { success: success, stack, return: returnValue };
    } catch(e) {
      console.log(e)
    }

function overflow(result: any): BigInt {
  while (
    result >
    BigInt(
      115792089237316195423570985008687907853269984665640564039457584007913129639935
    )
  ) {
    result -=
      BigInt(
        115792089237316195423570985008687907853269984665640564039457584007913129639935
      );
  }
  while (result < 0) {
    result +=
      BigInt(
        115792089237316195423570985008687907853269984665640564039457584007913129639935
      );
  }
  return BigInt(result);
  }
  
}

function twoComplementF(number: any): bigint {
  const twoComplement = BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );
  const maxValue = BigInt(
    "0x8000000000000000000000000000000000000000000000000000000000000000"
  );
  if (BigInt(number) > maxValue) {
    return BigInt(number) - twoComplement - BigInt(1);
  } else {
    return BigInt(number);
  }
}
