export interface SufaceWaterConstructionState {
  id: number
  constructionTypeId?: number
  provinceId?: number
  districtId?: number
  communeId?: number
  riverId?: number
  basinId?: number
  subBasinId?: number
  aquiferId?: number
  constructionName?: string
  constructionCode?: string
  constructionLocation?: string
  x?: number | null
  y?: number | null
  lat?: number | null
  lng?: number | null
  startDate?: number | null
  exploitedWS?: string
  exploitMode?: string
  exploitMethod?: string
  exploitPurpose?: string
  dischargeMethod?: string
  dischargeMode?: string
  dischargeWS?: string
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
  exploitDuration?: string
  drillingDuration?: string
  drillingPurpose?: string
  explorationPurposes?: string
  drillingScale?: string
  constructionTime?: string
  designFloodLevel?: number | null
  checkFloodWL?: number | null
  numberExploitWells?: number | null
  amountWaterExploited?: number | null
  numberMonitoringWells?: number | null
  description?: string
  wellNumber?: string
  monitoringWellWL?: number | null
  wellWL?: number | null
  waterDepthFrom?: number | null
  waterDepthTo?: number | null
  lowWL?: number | null
  staticWL?: number | null
  dynamicWL?: number | null
  volumeOfExplorationItems?: string
  waterExtractionFlowDesign?: number | null
  waterExtractionFlowReality?: number | null
  constructionDetailLocation?: string
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
  smallPlanningArea?: string
  guaranteedPower?: number | null
  constructionLevel?: string
  kqKf?: string
  damElevation?: number | null
  averagePumpTime?: string
  maximumPumpTime?: string
  minimumPumpTime?: string
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



// Construction Items State
export interface ConstructionItemState {
  id?: number;
  constructionId?: number;
  name?: string;
  x?: number;
  y?: number;
  lat?: number;
  lng?: number;
}