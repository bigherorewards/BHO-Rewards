interface AwardStruct {
  name: string
  issuer: string
  owner: string
  dateIssued: number
  location: string
}

function autobind<TFunction extends any>(Klass: Function) {
  class Bound extends (<{ new (...args: any[]): any }>(<unknown>Klass)) {
    constructor(...args: any[]) {
      super(...args)
      const self = this
      return new Proxy(this, {
        get: (target, key) => {
          const prop = Reflect.get(target, key)
          const boundFn = prop.bind(self)
          if (typeof prop === "function")
            return (...args: any[]) => {
              const result = boundFn(...args)
              if (result === self || result === target) {
                return target
              }
              return result
            }
        }
      })
    }
  }
  return <TFunction>(Bound as unknown)
}
interface CertificateConstructor<T extends Certificate = Certificate> {
  new (
    name: string,
    issuer: string,
    owner: string,
    dateIssued: number,
    location: string
  ): T
  from(award: AwardStruct): T
}

@autobind
class Certificate {
  static from(award: AwardStruct) {
    return new this(
      award.name,
      award.issuer,
      award.owner,
      award.dateIssued,
      award.location
    )
  }

  private dateIssued: Date

  protected constructor(
    public name: string,
    public issuer: string,
    public owner: string,
    dateIssued: number,
    public location: string
  ) {
    this.dateIssued = new Date(dateIssued)
  }

  public date() {
    return new Proxy<Date>(this.dateIssued, {
      get: Reflect.get,
      set: Reflect.set
    })
  }
}

const a = Certificate.from({} as AwardStruct)
