import {
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Vendor from './Vendor';
import { removeVendor, searchVendor } from './VendorApi';
import './VendorList.css';
const VendorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const history = useHistory();
  const search = () => {
    const Vendors = searchVendor();
    setVendors(Vendors);
  };
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const remove = (id: string) => {
    removeVendor(id);
    search();
  };

  const addVendor = () => {
    history.push('/page/vendors/new');
  };
  const editVendor = (id: string) => {
    history.push('/page/vendors/' + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name || 'Proveedores'} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Gestión de Proveedores </IonTitle>
          <IonItem>
            <IonButton
              onClick={addVendor}
              color='primary'
              fill='solid'
              slot='end'
            >
              Agregar Proveedor
              <IonIcon icon={add} />
            </IonButton>
          </IonItem>
          <IonGrid fixed={true} className='table'>
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Dirección</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>
            {vendors.map((vendor: Vendor) => {
              return (
                <IonRow key={vendor.id}>
                  <IonCol>{vendor.firstName + ' ' + vendor.lastName}</IonCol>
                  <IonCol>{vendor.email}</IonCol>
                  <IonCol>{vendor.phone}</IonCol>
                  <IonCol>{vendor.address}</IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => editVendor(String(vendor.id))}
                      color='primary'
                      fill='clear'
                      size='small'
                    >
                      <IonIcon icon={pencil} slot='icon-only' />
                    </IonButton>
                    <IonButton
                      onClick={() => remove(String(vendor.id))}
                      color='danger'
                      fill='clear'
                      size='small'
                    >
                      <IonIcon icon={close} slot='icon-only' />
                    </IonButton>
                  </IonCol>
                </IonRow>
              );
            })}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default VendorList;
