import React, { PureComponent, Fragment } from "react"
import Select from "react-select"
import { pxTo } from "design-system-utils"
import { ds } from "styles/tokens"
import Router from "next/router"
import Link from "next/link"
import Translate from "components/Translate"
import { DEFAULT_LANG } from 'utils/config'

const baseFontSize = ds.get("type.sizes.baseFontSize")
const options = {
  en: { value: "en", label: "English" },
  fr: { value: "fr", label: "Français" },
}

class SelectLanguage extends PureComponent {
  state = {
    selectedOption: options[this.props.router.query.lang ? this.props.router.query.lang : DEFAULT_LANG],
  }

  _handleChange = (selectedOption) => {
    const { onChange, router } = this.props
    const newLocale = selectedOption.value
    this.setState({ selectedOption })
    onChange({ locale: newLocale, fallback: DEFAULT_LANG })
    let href
    let as
    switch (router.route) {
      case "/index":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/brand":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/brand`
        break

      case "/product":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/product`
        break

      default:
        break
    }

    Router.push(href, as, {
      shallow: true,
    })
  }

  render() {
    const { selectedOption } = this.state
    const { router } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    const newLocale = locale === "en" ? "fr" : "en"
    let href
    let as
    switch (router.route) {
      case "/index":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/brand":
        href = `/brand?lang=${newLocale}`
        as = `/${newLocale}/brand`
        break

      case "/work":
        href = `/product?lang=${newLocale}`
        as = `/${newLocale}/product`
        break
      default:
        break
    }
    const customStyles = {
      container: (base, state) => ({
        ...base,
        cursor: "pointer",
        pointerEvents: "all",
        border: 0,
        outline: 0,
      }),
      control: (base, state) => ({
        ...base,
        border: 0,
        outline: 0,
        boxShadow: "none",
      }),
      indicatorSeparator: (base, state) => ({
        background: "transparent",
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        padding: 0,
        opacity: state.isFocused === true ? 0 : 1,
      }),
      valueContainer: (base, state) => ({
        ...base,
      }),
      singleValue: (base, state) => ({
        ...base,
        position: "relative",
        transform: "unset",
        fontSize: "12px",
        color: ds.get("colors['grey-300']"),
      }),
      option: (base, state) => ({
        ...base,
        border: 0,
        outline: 0,
        backgroundColor: "white",
        fontSize: "12px",
        color: ds.get("colors['grey-300']"),
        fontWeight: state.isSelected ? "bold" : "100",
        fontFamily: ds.get('type.fontFamily.emphasis')
      }),
      menu: (base, state) => ({
        boxShadow: `0 ${pxTo(2, baseFontSize, "rem")} ${pxTo(4, baseFontSize, "rem")} 0 rgba(0,0,0,0.2)`,
        zIndex: 5,
        position: "absolute",
        top: 0,
      }),
    }
    const goToWebsiteLabel = `goToWebsite.${newLocale}`
    return (
      <Fragment>
        <div className="text-black-100 font-emphasis text-12">
          <Select
            instanceId="selectLang"
            value={selectedOption}
            onChange={this._handleChange}
            options={Object.values(options)}
            styles={customStyles}
          />
        </div>
      </Fragment>
    )
  }
}

export default SelectLanguage