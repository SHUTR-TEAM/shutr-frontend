"use client";

import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getPackagesByPortfolio } from "@/app/redux/features/portfolio";
import { useSearchParams } from "next/navigation";

export default function PackageSelection() {
  const { register } = useFormContext();

  const params = useSearchParams();
  // const photographerId = params.get("photographerId");
  const portfolioId = params.get("portfolioId");

  // const packageList = [
  //   {
  //     id: "1",
  //     name: "Basic",
  //     price: 499,
  //     features: [
  //       "4 Hours Coverage",
  //       "1 Photographer",
  //       "Digital Delivery",
  //       "50 Edited Photos",
  //     ],
  //   },
  //   {
  //     id: "1",
  //     name: "Premium",
  //     price: 899,
  //     features: [
  //       "6 Hours Coverage",
  //       "2 Photographers",
  //       "Digital + USB Delivery",
  //       "100 Edited Photos",
  //       "Photo Album",
  //     ],
  //   },
  //   {
  //     id: "1",
  //     name: "Luxury",
  //     price: 1499,
  //     features: [
  //       "8 Hours Coverage",
  //       "2 Photographers",
  //       "Digital + USB Delivery",
  //       "Unlimited Edited Photos",
  //       "Premium Photo Album",
  //       "Drone Shots",
  //     ],
  //   },
  // ];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (portfolioId) {
      dispatch(getPackagesByPortfolio({ portfolioId: portfolioId }));
    }
  }, [dispatch, portfolioId]);

  // Get Redux state
  const activePackages = useSelector(
    (state: RootState) => state.portfolio.activePackages
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Package & Payment</h3>

      <div className={styles.packageGrid}>
        {Array.isArray(activePackages.data) &&
          activePackages.data.map((packageItem, i) => (
            <div className={styles.package} key={i}>
              <input
                type="radio"
                value={packageItem.id}
                id={packageItem.title.toLowerCase()}
                className={styles.radioInput}
                defaultChecked={i === 0}
                {...register("package_id", { required: true })}
              />
              <label
                htmlFor={packageItem.title.toLowerCase()}
                className={styles.packagelabel}
              >
                <div className={styles.packageHeader}>
                  <h4>{packageItem.title}</h4>
                  <p className={styles.price}>$ {packageItem.price}</p>
                </div>
                <ul className={styles.features}>
                  {packageItem.details.map((feature, i) => (
                    <li key={i}>
                      <Check size={16} /> {feature}
                    </li>
                  ))}
                </ul>
              </label>
            </div>
          ))}

        <div className={styles.package}>
          <input
            type="radio"
            value=""
            id="custom"
            className={styles.radioInput}
            {...register("package_id", { required: true })}
          />
          <label htmlFor="custom" className={styles.packagelabel}>
            <div className={styles.packageHeader}>
              <h4>Custom</h4>
              {/* <p className={styles.price}>$ 1499</p> */}
            </div>
            <p>
              The photographer will contact you to discuss your requirements and
              provide a custom quota
            </p>
            {/* <ul className={styles.features}>
              <li>
                <Check size={16} /> 8 Hours Coverage
              </li>
              <li>
                <Check size={16} /> 2 Photographers
              </li>
              <li>
                <Check size={16} /> Digital + USB Delivery
              </li>
              <li>
                <Check size={16} /> Unlimited Edited Photos
              </li>
              <li>
                <Check size={16} /> Premium Photo Album
              </li>
              <li>
                <Check size={16} /> Drone Shots
              </li>
            </ul> */}
          </label>
        </div>
      </div>

      {/* <div className={styles.addons}>
        <h4 className={styles.addonsTitle}>Additional Services</h4>
        <div className={styles.addonGrid}>
          <div className={styles.addon}>
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
      </div> */}
    </div>
  );
}
