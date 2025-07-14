import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { db } from "../firebase";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import GoogleMapReact from "google-map-react";
import GoogleMapComponent from "../components/GoogleMapComponent";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  const [mapLocation, setMapLoction] = useState();
  const [showLocation, setShowLocation] = useState("");
  const [address, setAddress] = useState("");

  const cell = {
    lat: 53.4770939,
    lng: -2.2344556,
  };

  // const getMap = async (add) => {
  //   const response = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=AIzaSyC8fAreSesb5aow6dXU9IVDcarAsTBi6hs`
  //   );
  //   const Results = response?.data?.results[0]?.geometry?.location;
  //   setMapLoction(Results);
  //   console.log("Results", mapLocation);
  // };
  // console.log("getAddress", getAddress);

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      if (!params.listingId) return;
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("docSnap.data()", docSnap.data());
        setShowLocation(docSnap.data().address);
        setListing(docSnap.data());
        // getMap(docSnap.data().address);
        setAddress(docSnap.data().address);
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId, showLocation]);
  if (loading) {
    return <Spinner />;
  }

  console.log("showLocation", showLocation);
  const AnyReactComponent = ({ text }) => (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "300px",
          backgroundColor: "#757575",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>
          {text}
        </div>
      </div>
      <img
        src={FaMapMarkerAlt} // Use the imported icon file as the src attribute
        alt="Icon"
        style={{
          marginTop: "-12px",
          marginLeft: "-12px",
          position: "absolute",
          left: "50%", // Center the pin horizontally
          top: "50%", // Center the pin vertically
          transform: "translate(-50%, -50%)", // Adjust the position to center
          width: "40px",
          height: "40px",
        }}
      />
    </div>
  );

  console.log("listing.geolocation.lat", listing.geolocation.lng);

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[16%] right-[5%] z-10 bg-white cursor-pointer
       border-2 border-gray-400 rounded-full w-12 h-12  flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p
          className="fixed top-[23%] right-[5%] font-semibold
         border-2 border-gray-400 rounded-md z-10 bg-white
          p-2"
        >
          Link copied
        </p>
      )}
      <div className="flex flex-col p-4 m-4 max-w-6xl bg-white rounded-lg shadow-lg md:flex-row lg:mx-auto lg:space-x-5">
        <div className="w-full h-[200px] lg-[400px] ">
          <p className="mb-3 text-2xl font-bold text-blue-900">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="mr-1 text-green-700" />
            {listing.address}
          </p>
          <div
            className="flex justify-start items-center
               space-x-4 w-[75%]"
          >
            <p
              className="bg-red-800 w-full max-w-[200px]
                 rounded p-1 text-white text-center font-semibold shadow-md"
            >
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            <p>
              {listing.offer && (
                <p
                  className="w-full max-w-[200px] bg-green-800
                  rounded-md p-1 text-white text-center font-semibold shadow-md"
                >
                  ${+listing.regularPrice - +listing.discountedPrice} discount
                </p>
              )}
            </p>
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 text-sm font-semibold lg:space-x-10">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="mr-1 text-lg" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="mr-1 text-lg" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="mr-1 text-lg" />
              {+listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="mr-1 text-lg" />
              {+listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setContactLandlord(true);
                }}
                className="px-7 py-3 w-full text-sm font-medium text-center text-white uppercase bg-blue-600 rounded shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div
          className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0
           ml-2"
        >
          {/* <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer> */}

          <GoogleMapComponent address={address} />
        </div>
      </div>
    </main>
  );
}
