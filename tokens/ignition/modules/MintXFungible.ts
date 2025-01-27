import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const MintXFungibleModule = buildModule('MintXFungibleModule', (m) => {
  const NAME = 'MINTX TOKEN';
  const SYMBOL = 'MNX';
  const INITIAL_SUPPLY = 100000000000;

  const fungible = m.contract('MintXFungible', [NAME, SYMBOL, INITIAL_SUPPLY]);

  return { fungible };
});

export default MintXFungibleModule;
