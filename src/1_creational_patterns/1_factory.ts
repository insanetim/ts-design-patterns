// First variant

interface IInsurance {
  id: number
  status: string
  setVehicle(vehicle: any): void
  submit(): Promise<boolean>
}

class TFInsurance implements IInsurance {
  id: number
  status: string
  private vehicle: any

  setVehicle(vehicle: any): void {
    this.vehicle = vehicle
  }

  async submit(): Promise<boolean> {
    const res = await fetch('', {
      method: 'POST',
      body: JSON.stringify({ vehicle: this.vehicle })
    })
    const data = await res.json()

    return data.isSuccess
  }
}

class ABInsurance implements IInsurance {
  id: number
  status: string

  private vehicle: any

  setVehicle(vehicle: any): void {
    this.vehicle = vehicle
  }

  async submit(): Promise<boolean> {
    const res = await fetch('', {
      method: 'POST',
      body: JSON.stringify({ vehicle: this.vehicle })
    })
    const data = await res.json()

    return data.isSuccess
  }
}

abstract class InsuranseFactory {
  db: any

  abstract createInsurance(): IInsurance

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status)
  }
}

class TFInsuranceFactory extends InsuranseFactory {
  override createInsurance(): TFInsurance {
    return new TFInsurance()
  }
}

class ABInsuranseFactory extends InsuranseFactory {
  override createInsurance(): ABInsurance {
    return new ABInsurance()
  }
}

const tfInsuranseFatory = new TFInsuranceFactory()
const ins = tfInsuranseFatory.createInsurance()
tfInsuranseFatory.saveHistory(ins)

// Second variant

const INSURANCE_TYPE = {
  tf: TFInsurance,
  ab: ABInsurance
}

type IT = typeof INSURANCE_TYPE

class InsuranseFactoryAlt {
  db: any

  createInsurance<T extends keyof IT>(type: T): IT[T] {
    return INSURANCE_TYPE[type]
  }

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status)
  }
}

const insuranseFactoryAlt = new InsuranseFactoryAlt()
const ins2 = new (insuranseFactoryAlt.createInsurance('tf'))()
insuranseFactoryAlt.saveHistory(ins2)
