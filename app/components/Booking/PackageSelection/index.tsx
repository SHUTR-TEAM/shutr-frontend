"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

export default function PackageSelection() {
  const { register } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Package & Payment</h3>

      {/* <RadioGroup defaultValue="basic" className={styles.packageGrid}>
        <div className={styles.package}>
          <RadioGroupItem value="basic" id="basic" className={styles.radioInput} {...register("package", { required: true })} />
          <label htmlFor="basic" className={styles.packagelabel}>
            <div className={styles.packageHeader}>
              <h4>Basic</h4>
              <p className={styles.price}>$ 499</p>
            </div>
            <ul className={styles.features}>
              <li><Check size={16} /> 4 Hours Coverage</li>
              <li><Check size={16} /> 1 Photographer</li>
              <li><Check size={16} /> Digital Delivery</li>
              <li><Check size={16} /> 50 Edited Photos</li>
            </ul>
          </label>
        </div>

        <div className={styles.package}>
          <RadioGroupItem value="premium" id="premium" className={styles.radioInput} {...register("package", { required: true })} />
          <label htmlFor="premium" className={styles.packagelabel}>
            <div className={styles.packageHeader}>
              <h4>Premium</h4>
              <p className={styles.price}>$ 899</p>
            </div>
            <ul className={styles.features}>
              <li><Check size={16} /> 6 Hours Coverage</li>
              <li><Check size={16} /> 2 Photographers</li>
              <li><Check size={16} /> Digital + USB Delivery</li>
              <li><Check size={16} /> 100 Edited Photos</li>
              <li><Check size={16} /> Photo Album</li>
            </ul>
          </label>
        </div>

        <div className={styles.package}>
          <RadioGroupItem value="luxury" id="luxury" className={styles.radioInput} {...register("package", { required: true })} />
          <label htmlFor="luxury" className={styles.packagelabel}>
            <div className={styles.packageHeader}>
              <h4>Luxury</h4>
              <p className={styles.price}>$ 1499</p>
            </div>
            <ul className={styles.features}>
              <li><Check size={16} /> 8 Hours Coverage</li>
              <li><Check size={16} /> 2 Photographers</li>
              <li><Check size={16} /> Digital + USB Delivery</li>
              <li><Check size={16} /> Unlimited Edited Photos</li>
              <li><Check size={16} /> Premium Photo Album</li>
              <li><Check size={16} /> Drone Shots</li>
            </ul>
          </label>
        </div>
      </RadioGroup> */}

      <div className={styles.addons}>
        <h4 className={styles.addonsTitle}>Additional Services</h4>
        <div className={styles.addonGrid}>
          <div className={styles.addon}>
            {/* <Checkbox id="drone" {...register("addons")} value="drone" /> */}
            <input
              type="checkbox"
              id="drone"
              {...register("addons")}
              value="drone"
            />
            <div>
              <label htmlFor="drone">Drone Photography</label>
              <p className={styles.addonPrice}>$ 299</p>
            </div>
          </div>
          <div className={styles.addon}>
            {/* <Checkbox id="express" {...register("addons")} value="express" /> */}
            <input
              type="checkbox"
              id="express"
              {...register("addons")}
              value="express"
            />
            <div>
              <label htmlFor="express">Express Delivery</label>
              <p className={styles.addonPrice}>$ 99</p>
            </div>
          </div>
          <div className={styles.addon}>
            {/* <Checkbox id="extraHour" {...register("addons")} value="extraHour" /> */}
            <input
              type="checkbox"
              id="extraHour"
              {...register("addons")}
              value="extraHour"
            />
            <div>
              <label htmlFor="extraHour">Extra Hour</label>
              <p className={styles.addonPrice}>$ 149</p>
            </div>
          </div>
          <div className={styles.addon}>
            {/* <Checkbox id="video" {...register("addons")} value="video" /> */}
            <input
              type="checkbox"
              id="video"
              {...register("addons")}
              value="video"
            />
            <div>
              <label htmlFor="video">Video Highlights</label>
              <p className={styles.addonPrice}>$ 399</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
