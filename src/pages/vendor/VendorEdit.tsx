import {
  IonButtons,
  IonContent,
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
  IonLabel,
  IonInput,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Vendor from './Vendor';
import { saveVendor, searchVendorById } from './VendorApi';
import './VendorList.css';
const VendorEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const history = useHistory();
  const [vendor, setVendor] = useState<Vendor>({});

  const save = () => {
    saveVendor(vendor);
    history.push('/page/vendors');
  };

  const search = () => {
    if (id === 'new') {
      setVendor({});
    } else {
      const result = searchVendorById(id);
      setVendor(result);
    }
  };
  useEffect(() => {
    search();
  }, [history.location.pathname]);

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
          <IonTitle>
            {id === 'new' ? 'Agregar Proveedor' : 'Editar Proveedor'}{' '}
          </IonTitle>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Nombre</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (vendor.firstName = String(e.detail.value))
                  }
                  value={vendor.firstName}
                  placeholder='Enter your name'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Apellido</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (vendor.lastName = String(e.detail.value))
                  }
                  value={vendor.lastName}
                  placeholder='Enter your last name'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Email</IonLabel>
                <IonInput
                  onIonChange={(e) => (vendor.email = String(e.detail.value))}
                  value={vendor.email}
                  placeholder='Enter your email'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Dirección</IonLabel>
                <IonInput
                  onIonChange={(e) => (vendor.address = String(e.detail.value))}
                  value={vendor.address}
                  placeholder='Enter your address'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Teléfono</IonLabel>
                <IonInput
                  onIonChange={(e) => (vendor.phone = String(e.detail.value))}
                  value={vendor.phone}
                  placeholder='Enter your phone number'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>

          <IonItem>
            <IonButton onClick={save} color='success' fill='solid' slot='end'>
              <IonIcon icon={checkmark} />
              Guardar
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default VendorEdit;
