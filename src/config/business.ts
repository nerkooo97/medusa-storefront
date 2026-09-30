/**
 * Centralizovana konfiguracija poslovnih informacija, kontakta,
 * uslova dostave, garancije i povrata.
 * 
 * Sve tekstualne stranice (Česta pitanja, Kako naručiti, Sigurnost,
 * Uslovi korištenja, Politika privatnosti, Podrška) čitaju ove podatke
 * tako da ih možete jednostavno promijeniti na samo jednom mjestu ovdje.
 */

export interface BusinessConfig {
  /** Naziv brenda i domene */
  name: string
  legalName: string
  domain: string

  /** Kontakt podaci */
  contact: {
    phone: string
    phoneTel: string
    email: string
    supportEmail: string
    privacyEmail: string
    workingHours: string
    /** Strukturirani podaci za Schema.org Google Search */
    openingHours: {
      opens: string
      closes: string
      days: string[]
    }
  }

  /** Uslovi dostave */
  shipping: {
    deliveryTime: string
    freeDeliveryThreshold: number
    freeDeliveryThresholdFormatted: string
    cost: number
    costFormatted: string
    minDeliveryDays: number
    maxDeliveryDays: number
  }

  /** Garancija */
  warranty: {
    durationText: string
    maxYearsText: string
  }

  /** Pravo na povrat */
  returns: {
    days: number
    daysText: string
    refundDays: number
    refundDaysText: string
  }

  /** Porezi i pravne stavke */
  legal: {
    vatRate: string
  }
}

export const businessConfig: BusinessConfig = {
  name: "pıko",
  legalName: "pıko d.o.o.",
  domain: "piko.ba",

  contact: {
    phone: "080 020 261",
    phoneTel: "080020261",
    email: "info@piko.ba",
    supportEmail: "podrska@piko.ba",
    privacyEmail: "podrska@piko.ba",
    workingHours: "Pon - Sub: 08:00 - 18:00",
    openingHours: {
      opens: "08:00",
      closes: "18:00",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  },

  shipping: {
    deliveryTime: "24 do 48 radnih sati",
    freeDeliveryThreshold: 100,
    freeDeliveryThresholdFormatted: "100,00 KM",
    cost: 9,
    costFormatted: "9,00 KM",
    minDeliveryDays: 1,
    maxDeliveryDays: 2,
  },

  warranty: {
    durationText: "12 do 36 mjeseci",
    maxYearsText: "do 3 godine",
  },

  returns: {
    days: 14,
    daysText: "14 dana",
    refundDays: 7,
    refundDaysText: "7 radnih dana",
  },

  legal: {
    vatRate: "17%",
  },
}

export default businessConfig
