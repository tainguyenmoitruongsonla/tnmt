export interface ConstructionState {
  id: number
  constructionTypeId?: number
  provinceId?: number
  districtId?: number
  communeId?: number
  riverId?: number
  basinId?: number
  subBasinId?: number
  aquiferId?: number
  constructionName?: string | null
  constructionCode?: string | null
  constructionLocation?: string | null
  x?: number | null
  y?: number | null
  lat?: number | null
  lng?: number | null
  startDate?: number | null
  exploitedWS?: string | null
  exploitMode?: string | null
  exploitMethod?: string | null
  exploitPurpose?: string | null
  dischargeMethod?: string | null
  dischargeMode?: string | null
  dischargeWS?: string | null
  dischargeFlow?: number | null
  maximumDischargeFlow?: number | null
  exploitMaxFlow?: number | null
  maximumFlow?: number | null
  minimumFlow?: number | null
  maximumWasteWaterFlow?: number | null
  ower?: number | null
  pumpCapacity?: number | null
  overflowFlow?: number | null
  riseWL?: number | null
  deadWL?: number | null
  preFlootMaxWL?: number | null
  flootWL?: number | null
  upstreamWL?: number | null
  downstreamWL?: number | null
  deadCapacity?: number | null
  usefulCapacity?: number | null
  totalCapacity?: number | null
  damHeight?: number | null
  damWidth?: number | null
  drainElevation?: number | null
  drainLength?: number | null
  drainDiameter?: number | null
  drainSize?: number | null
  pumpNumber?: number | null
  pumpDesignFlow?: number | null
  pumpMaxFlow?: number | null
  suctionTankWL?: number | null
  waterSupplyFlow?: number | null
  exploitDuration?: string | null
  drillingDuration?: string | null
  drillingPurpose?: string | null
  explorationPurposes?: string | null
  drillingScale?: string | null
  constructionTime?: string | null
  designFloodLevel?: number | null
  checkFloodWL?: number | null
  numberExploitWells?: number | null
  amountWaterExploited?: number | null
  numberMonitoringWells?: number | null
  description?: string | null
  wellNumber?: string | null
  monitoringWellWL?: number | null
  wellWL?: number | null
  waterDepthFrom?: number | null
  waterDepthTo?: number | null
  lowWL?: number | null
  staticWL?: number | null
  dynamicWL?: number | null
  volumeOfExplorationItems?: string | null
  waterExtractionFlowDesign?: number | null
  waterExtractionFlowReality?: number | null
  constructionDetailLocation?: string | null
  realityWateringArea?: number | null
  wateringAreaDesigned?: number | null
  guaranteedFlow?: number | null
  hmax?: number | null
  hmin?: number | null
  htt?: number | null
  realityFlow?: number | null
  flowDesigned?: number | null
  flowAvgForYears?: number | null
  rainAvgForYears?: number | null
  basinArea?: number | null
  averageDischargeFlow?: number | null
  smallPlanningArea?: string | null
  guaranteedPower?: number | null
  constructionLevel?: string | null
  kqKf?: string | null
  damElevation?: number | null
  averagePumpTime?: string | null
  maximumPumpTime?: string | null
  minimumPumpTime?: string | null
  maximumDischargeFlowPre?: number | null
  capacityPre?: number | null
  downstreamWLPre?: number | null
  upstreamWLPre?: number | null
  minimumFlowPre?: number | null
  maximumFlowPre?: number | null
  power?: number | null
  exploitAquifer?: number | null
  probeAquifer?: number | null
}

export const emptyConstructionData: ConstructionState = {
  id: 0,
  constructionTypeId: 0,
  provinceId: 0,
  districtId: 0,
  communeId: 0,
  riverId: 0,
  basinId: 0,
  subBasinId: 0,
  aquiferId: 0,
  constructionName: null,
  constructionCode: null,
  constructionLocation: null,
  x: null,
  y: null,
  lat: null,
  lng: null,
  startDate: null,
  exploitedWS: null,
  exploitMode: null,
  exploitMethod: null,
  exploitPurpose: null,
  dischargeMethod: null,
  dischargeMode: null,
  dischargeWS: null,
  dischargeFlow: null,
  maximumDischargeFlow: null,
  exploitMaxFlow: null,
  maximumFlow: null,
  minimumFlow: null,
  maximumWasteWaterFlow: null,
  ower: null,
  pumpCapacity: null,
  overflowFlow: null,
  riseWL: null,
  deadWL: null,
  preFlootMaxWL: null,
  flootWL: null,
  upstreamWL: null,
  downstreamWL: null,
  deadCapacity: null,
  usefulCapacity: null,
  totalCapacity: null,
  damHeight: null,
  damWidth: null,
  drainElevation: null,
  drainLength: null,
  drainDiameter: null,
  drainSize: null,
  pumpNumber: null,
  pumpDesignFlow: null,
  pumpMaxFlow: null,
  suctionTankWL: null,
  waterSupplyFlow: null,
  exploitDuration: null,
  drillingDuration: null,
  drillingPurpose: null,
  explorationPurposes: null,
  drillingScale: null,
  constructionTime: null,
  designFloodLevel: null,
  checkFloodWL: null,
  amountWaterExploited: null,
  description: null,
  wellNumber: null,
  monitoringWellWL: null,
  wellWL: null,
  waterDepthFrom: null,
  waterDepthTo: null,
  lowWL: null,
  staticWL: null,
  dynamicWL: null,
  volumeOfExplorationItems: null,
  waterExtractionFlowDesign: null,
  waterExtractionFlowReality: null,
  constructionDetailLocation: null,
  realityWateringArea: null,
  wateringAreaDesigned: null,
  guaranteedFlow: null,
  hmax: null,
  hmin: null,
  htt: null,
  realityFlow: null,
  flowDesigned: null,
  flowAvgForYears: null,
  rainAvgForYears: null,
  basinArea: null,
  averageDischargeFlow: null,
  smallPlanningArea: null,
  guaranteedPower: null,
  constructionLevel: null,
  kqKf: null,
  damElevation: null,
  averagePumpTime: null,
  maximumPumpTime: null,
  minimumPumpTime: null,
  maximumDischargeFlowPre: null,
  capacityPre: null,
  downstreamWLPre: null,
  upstreamWLPre: null,
  minimumFlowPre: null,
  maximumFlowPre: null,
  power: null,
  exploitAquifer: null,
  probeAquifer: null,
};


// Construction Items State
export interface ConstructionItemState {
  id?: number;
  constructionId?: number;
  name?: string;
  x?: number;
  y?: number;
  lat?: number;
  lng?: number;
  amountWaterExploited?:number | null;
  miningMode?:number | null;
  waterDepthFrom?: number | null;
  waterDepthTo?: number | null
  staticWL?: number | null
  dynamicWL?: number | null
  depthFilterTubeFrom?: number | null
  depthFilterTubeTo?: number | null
}